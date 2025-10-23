var register = Handlebars => {
  var helpers = {
    if_eq: function(a, b, opts) {
	    return a == b ? opts.fn(this) : opts.inverse(this)
    },
    if_neq: function(a, b, opts) {
      return a == b ? opts.inverse(this) : opts.fn(this)
    },
    if_null: function(a, opts) {
      return typeof(a) === 'undefined' ? opts.fn(true) : opts.inverse(false)
    },
    if_not_null: function(a, opts) {
      return typeof(a) === 'undefined' ? opts.inverse(false) : opts.fn(true)
    },
    if_not_includes: function(a, b, opts) {
      return opts.fn(!a.includes(b))
    },
    select: function(selected, options) {
      return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace(new RegExp('>' + selected + '</option>'), ' selected="selected"$&')
    },
    capitalizeFirst: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    if_contains: function(array, value, opts) {
      if(array)
        return (array.includes(value)) ? opts.fn(this) : opts.inverse(this)
      return ''
    },
    capitalizeEveryFirst: function(str) {
      str = str.toLowerCase().split(' ')
      for(var i = 0; i < str.length; i++) 
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
      return str.join(' ')
    },
    json: function(obj) {
      return JSON.stringify(obj)
    }
  }
  if(Handlebars && typeof Handlebars.registerHelper === 'function')
    for(var prop in helpers)
      Handlebars.registerHelper(prop, helpers[prop])
  return helpers
}
module.exports.register = register
module.exports.helpers = register(null)