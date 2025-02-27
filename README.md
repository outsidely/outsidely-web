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
 * implement a (private) personal feed list 
   * https://outsidely-geo-app.azurewebsites.net/api/activities?userid=mamund 
   * NOTE: you only need the `userid` argument to get the private feed
 * [ ] implement profile
   * need api call(s)
 * [ ] implement gear support
   * need api call(s)
 * implement photo upload
   * need api call(s)
 * implement detail edit
   * need api call(s)
 * implement delete activity
   * need api call(s)
 * implement `props` (like kudos)
   * need api call(s)
 * implement a connection/sharing process 
   * need api call(s)
   * should work like LinkedIn (following MUST be mutual)
 * [ ] Improve acitivity list display (too many fields, merge, remove, etc.)
   * https://outsidely-geo-app.azurewebsites.net/api/activities 
   * [x] firstname, lastname (userid)
   * [x] distance time (pace,speed)
   * [x] make dates "in english" (prep for locale)
   * [x] replace activity type w/ icon
   * [x] add support for title (from server?)
   * [ ] prep for server handling computations (mi/km, pace, etc.)
   * [ ] notes/description in wrapping textarea(?)
 * [ ] Produce ALPS document for the outsidely domain (low priority)
 * Implement Security (Basic Auth) for
   * [x] index (prompts => cookie and auth-header)
   * [ ] detail
   * [x] upload (cookie => upload fields)
   * [ ] profile / gear