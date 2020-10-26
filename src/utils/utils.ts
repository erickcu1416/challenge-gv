export class Utils {
  public static compare(a,b) {
    const ad = '' + a.time.hour + ':' + a.time.minute;
    const bd = '' + b.time.hour + ':' + b.time.minute;
    const time1 = parseFloat(ad.replace(':', '.').replace(/[^\d.-]/g, ''));
    const time2 = parseFloat(bd.replace(':', '.').replace(/[^\d.-]/g, ''));
    if (time1 < time2) return -1;
    if (time1 > time2) return 1;
    return 0;
  }
}
