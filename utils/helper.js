export class Helper {

  static isEmpty(s) {
    let b = false
    if (s == null || s == undefined) b = true
    else if (Array.isArray(s) && s.length < 1) b = true
    return b
}

  static getDateStr(dt) {
    if (dt == null) {
      return dt;
    }
    
    let s = `${dt.getFullYear()}-${this.paddZero(dt.getMonth() + 1)}-${Helper.paddZero(dt.getDate())}`;
    return s;
  }

  static getDateStr1(dt) {
    let s = `${dt.getFullYear()}${this.paddZero(dt.getMonth() + 1)}${Helper.paddZero(dt.getDate())}`;
    return s;
  }

  static paddZero(i) {
    let s = `${i}`;
    if (i < 10) {
      s = `0${i}`;
    }

    return s;
  }
}

export default Helper;
