# outsidely-web

A simple HTML-based client for the outsidely API

## Work Items

 * Implement validation list for activity type
   * https://outsidely-geo-app.azurewebsites.net/api/validations/activitytype
   * [x] for feed list
   * [ ] for detail
   * [ ] for upload
 * [ ] implement detail view 
   * https://outsidely-geo-app.azurewebsites.net/api/activities?activityid=c3b0f0ad-44f3-4ca6-8331-57e417fa2449&userid=mamund 
   * NOTE: you MUST include both `activityid` and `userid` to get a single record
 * [ ] implement profile
   * need api call(s)
 * [ ] implement gear support
   * need api call(s)
 * [ ] Improve acitivity list display (too many fields, merge, remove, etc.)
   * https://outsidely-geo-app.azurewebsites.net/api/activities 
   * [x] firstname, lastname (userid)
   * [x] distance time (pace,speed)
   * [x] make dates "in english" (prep for locale)
   * [ ] replace activity type w/ icon
   * [ ] add support for title (from server?)
   * [ ] prep for server handling computations (mi/km, pace, etc.)
   * [ ] notes/description in wrapping textarea(?)
 * [ ] Produce ALPS document for the outsidely domain (low priority)
