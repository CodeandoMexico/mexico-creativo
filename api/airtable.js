import fetch from 'node-fetch'

const filters = (filterBy) => {
  // Input: [{ field: String, operator: String = '=', value: Any }]
  const stringFilters = filterBy
    .filter((filter) => !filter.optional) // desecha los filtros opcionales
    .map((filter) => {
      if (filter.formulaType || filter.formulaType === 'regex') {
        return `REGEX_MATCH(ARRAYJOIN({${filter.field}}, ";"),"\\b${filter.value}\\b")`
      } else {
        return `{${filter.field}}${filter.operator || '='}${filter.value}`
      }
    })
    .join(',')
  return stringFilters // output: 'field1=value1,field2!=value2,...,fieldN=valueN'
}

const optionalFilters = (filterBy) => {
  // obtiene los filtros opcionales
  const stringFilters = filterBy
    .filter((filter) => filter.optional)
    .map((filter) => {
      if (filter.formulaType || filter.formulaType === 'regex') {
        return `REGEX_MATCH(ARRAYJOIN({${filter.field}}, ";"),"\\b${filter.value}\\b")`
      } else {
        return `{${filter.field}}${filter.operator || '='}${filter.value}`
      }
    })
    .join(',')

  return stringFilters
}

const fields = (fieldList) => {
  return fieldList.map((field) => `fields[]=${field}`).join('&')
}

class Airtable {
  headers = {
    'Content-Type': 'application/json',
  }

  baseURL = 'https://api.airtable.com/v0/'
  appId = ''
  apiKey = ''

  constructor(args) {
    this.config(args)
  }

  config(args) {
    this.baseURL = args.baseURL ? args.baseURL : this.baseURL
    this.appId = args.appId ? args.appId : this.appId
    this.apiKey = args.apiKey ? args.apiKey : this.apiKey
  }

  request(endpoint, config = {}, stringify) {
    return new Promise((resolve, reject) => {
      let url = `${this.baseURL}${this.appId}`

      if (endpoint) {
        url = `${url}/${endpoint}`
      }

      console.log('baseURL: ', url)

      if (Object.keys(config).length) {
        let urlConfig = ''
        if (config.fields) {
          urlConfig = `${urlConfig}${fields(config.fields)}`
        }
        if (config.filterBy) {
          const hayOpcionales =
            optionalFilters(config.filterBy).length > 0 || false
          urlConfig = `${urlConfig}&filterByFormula=AND(${
            config.onlyPublic ? 'PUBLICO,' : ''
          }${filters(config.filterBy)}${
            hayOpcionales
              ? `${filters(config.filterBy) ? ',' : ''}OR(${optionalFilters(
                  config.filterBy
                )})`
              : ''
          })`
        } else if (config.onlyPublic) {
          urlConfig = `${urlConfig}&filterByFormula=PUBLICO`
        }
        if (config.orderBy) {
          urlConfig = `${urlConfig}&sort[0][field]=${config.orderBy.field}${
            config.orderBy.direction
              ? `&sort[0][direction]=${config.orderBy.direction}`
              : '&sort[0][direction]=asc'
          }`
        }
        if (config.pageSize) {
          urlConfig = `${urlConfig}&pageSize=${config.pageSize}`
        }
        if (config.offset) {
          urlConfig = `${urlConfig}&offset=${config.offset}`
        }
        url = `${url}?${urlConfig}`
      }

      if (this.apiKey !== '') {
        this.headers.Authorization = `Bearer ${this.apiKey}`
      }

      console.log('fetch url: ', url)
      console.log('fetch headers: ', JSON.stringify(this.headers))

      fetch(url, {
        headers: this.headers,
      })
        .then((result) => {
          if (result.status === 200) return result.json()
          reject(result)
        })
        .then((data) => {
          // console.log('data: ', JSON.stringify(data, null, 2))
          if (stringify) {
            console.log('stringify!')
            const stringData = JSON.stringify(data) + '\n'
            resolve(stringData)
          } else {
            console.log('not stringify')
            resolve(data)
          }
        })
        .catch((error) => {
          console.error('Error: ', error)
          reject(error)
        })
    })
  }
}

const airtableConfig = {
  appId: process.env.AIRTABLE_APPID,
  apiKey: process.env.AIRTABLE_APIKEY,
}

console.log('Airtable config: ', JSON.stringify(airtableConfig))

const airtable = new Airtable(airtableConfig)

export default airtable

export { Airtable, airtable }
