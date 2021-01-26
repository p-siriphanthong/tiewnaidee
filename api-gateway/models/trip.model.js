class Trip {
  constructor(data) {
    this.title = data.title
    this.eid = data.eid
    this.url = data.url
    this.description = data.description
    this.shortContent = data.shortContent
    this.photos = data.photos
    this.tags = data.tags
  }
}

module.exports = Trip
