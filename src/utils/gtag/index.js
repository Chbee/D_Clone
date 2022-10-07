const GTAG_ID = process.env.NODE_ENV === 'prd' ? 'UA-48000917-2' : ''

export default {
  config: {
    id: GTAG_ID,
    params: {
      send_page_view: false
    }
  }
}