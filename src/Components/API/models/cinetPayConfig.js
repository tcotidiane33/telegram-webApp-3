/* eslint-disable @typescript-eslint/no-explicit-any */

export function CinetPayConfig(obj = {}) {
    this.apikey = obj.apikey;
    this.site_id = obj.site_id;
    this.notify_url = obj.notify_url;
    this.return_url = obj.return_url;
    this.lang = obj.lang;
  }