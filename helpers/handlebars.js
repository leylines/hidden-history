module.exports = {
  dateToLocale: function(date){
    if (date) {
       var jsDate = new Date(date);
       var year = Math.abs(jsDate.getUTCFullYear());
       var month = jsDate.getUTCMonth()+1;
       var day = jsDate.getUTCDate();
       var readable = (year < 1000? '0' : '') + (year < 100? '0' : '') + (year < 10? '0' : '') + year + (month > 1 || day > 1? "-" + (month < 10? '0' : '') + month : '') + (day > 1? "-" + (day < 10? '0' : '') + day : '');
    }
    return date ? readable : '';
  },
  ifCond: function(v1,operator,v2,options) {
    switch (operator)
    {
        case "==":
            return (v1==v2)?options.fn(this):options.inverse(this);
        case "!=":
            return (v1!=v2)?options.fn(this):options.inverse(this);
        case "===":
            return (v1===v2)?options.fn(this):options.inverse(this);
        case "!==":
            return (v1!==v2)?options.fn(this):options.inverse(this);
        case "&&":
            return (v1&&v2)?options.fn(this):options.inverse(this);
        case "||":
            return (v1||v2)?options.fn(this):options.inverse(this);
        case "<":
            return (v1<v2)?options.fn(this):options.inverse(this);
        case "<=":
            return (v1<=v2)?options.fn(this):options.inverse(this);
        case ">":
            return (v1>v2)?options.fn(this):options.inverse(this);
        case ">=":
            return (v1>=v2)?options.fn(this):options.inverse(this);
        default:
            return eval(""+v1+operator+v2)?options.fn(this):options.inverse(this);
    }
  }
};
