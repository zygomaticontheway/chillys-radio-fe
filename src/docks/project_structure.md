# Component schema
[Component schema ](https://docs.google.com/spreadsheets/d/12BHH5FpAXDHBYHgAaheHsulIyUuop1CBw8tNG1xPyqY/edit?gid=441764757#gid=441764757)

# Pages (front-website address, not the back-end controller endpoints):

    - homepage (/)
    - station (/stations/{station-name})
    - my profile (/my-profile)
    - login (/login)
    - register (/register)
    - password change (/password-change)
    - users (/users)
    - user profile (/users/{username})

## Home page content

### layout

- **header** - always on top

  - _1st line:_
    - logo = homepage link (sticked left)
    - active played station (when nothing active = null (nothing))
      - favicon
      - play/pause
      - volume
      - name
    - profile link (unauthorized = "login/register") (sticked right)
      - icon-profile
      - username
  - _2nd line:_
    - filters (sticked left) - every filter is a pop-up curtain:
      - Top stations:
        - Top clicks
        - Top votes
      - Country (generated values from \*.ts file): automatic filter setup every genre adding
      - Language (generated values from \*.ts file): automatic filter setup every genre adding
      - Tag (generated values from \*.ts file): automatic filter setup every genre adding
    - search input (sticked right)

- **body**
  - _banner:_
    - h1 "The Chillys Radio"
    - h3 or p "Listen to ${amount-of-all-stations} radio stations worldwide for free"
  - _stations:_ - grid with stations
    - filter name:
      - default: "All stations"
      - ${amount-of-filtered-stations}
    - stations grid:
      - favicon (when null = default img)
      - name
      - country + language codes
      - tags = first 3 tags
      - toggle favorite: heart icon in a corner of favicon
    - pages:
      - 1, 2, 3, 4, 5, ... n
      - 20 stations at page
- **footer**
  - about us
  - contacts

## Station page content

### layout

- **header** - always on top
  ...
- **body**

  - _station container_
    - station logo (favicon) (sticked left)
    - play/pause button (same and synchronized with the header's)
    - name
    - votes: icon + amount
    - clicks: icon + amount
    - add to favorite: opens login page when unauthorized
    - description
    - country = links
    - language codes = links
    - tags = links

- **footer**
  ...

## Profile page content

### layout

- **header** - always on top
  ...
- **body**

  - _profile info_
    - username
    - email
    - change password
    - logout
  - _favorite stations container_
    - h2 "Favorite stations"
    - stations grid
      - ... same as at homepage
      - when toggle favorite nothing happen until page refresh

- **footer**
  ...

## Admin-profile page content

### layout

- **header** - always on top
  ...
- **body**

  - _profile info_
    - username
    - email
    - change password
    - logout
    - users
    - update stations button:
      - on click = new component:
        - 25\*25px, sticked to lower left corner of the screen
        - with preloader inside while request running
        - with success icon +timeout 10 sec when request finished
  - _favorite stations container_
    - h2 "Favorite stations"
    - stations grid
      - ... same as at homepage
      - when toggle favorite nothing happen until page refresh

- **footer**
  ...

## Login page content

### layout

- **header** - always on top
  ...
- **body**
  - _auth form_
    - username
    - password
    - register link
    - forgot the password link (for future)
- **footer**
  ...

## Register page content

### layout

- **header** - always on top
  ...
- **body**
  - _auth form_
    - username
    - email
    - password
    - auth link
- **footer**
  ...

## Users page content (admin only)

### layout

- **header** - always on top
  ...
- **body**

  - _users list:_
    - username
    - email
    - change user data button = same as registration form, but without aust link
    - logout button
    - set admin switcher

- **footer**
  ...


## Default colors

### green
left: 55%;

### deep green (button)
rgba(70, 149, 73, 1);

### black (header)
rgba(30, 31, 32, 1);

### layout background
! dark red: rgba(71, 34, 34, 1);
dark green: rgba(32, 42, 31, 1);
green: rgba(37, 71, 34, 1);

### light gray
rgba(238, 238, 238, 1);
