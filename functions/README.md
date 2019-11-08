# Cloud Functions

## API Docs

* [**Active Team**](#active-team)
* [**Auth**](#auth)
* [**Common**](#common)
* [**Constants**](#constants)
* [**Leagues**](#leagues)
* [**Listeners**](#listeners)
* [**On Delete**](#on-delete)
* [**On Sign Up**](#on-sign-up)
* [**Players**](#players)
* [**Points**](#points)
* [**Teams**](#teams)
* [**Users**](#users)
* [**Weekly Teams**](#weekly-teams)

## Active Team

  * ### `updateTeam`
      #### Data Params
          {
            newTeam: [player_ids]
          }
  * ### `getActiveTeam`
      #### Data Params
          { }
      #### Response
        {
          players: [...{
            goals, 
            price,
            assists,
            points,
            position, 
            previousScore, 
            name, 
            team,
            id,
          }]
          captain: CaptainID || `null`
        }

  * ### `makeCaptain`
      #### Data params
          {
            playerId: player_id
          }
  * ### `removeCaptainWhenTeamUpdated` - Listener
      - Listens to writes on active-teams
      - If captain no longer in active team, set captain to `null`

## Auth
  * ### `updateDisplayName`
      #### Data Params
          {
            displayName: displayName
          }
  * ### `updateTeamName`
      #### Data Params
          {
            teamName: teamName
          }
  * ### `usersWithExtraRoles`
      #### Data Params
          { }
  * ### `addUserRole`
      #### Data Params
          {
            role: role,
            email: userEmail
           }
  * ### `removeUserRole`
      #### Data Params
          {
            role: role,
            email: userEmail
           }
  * ### `getRolePermissions`
      #### Data Params
          {
            role: role,
            email: userEmail
           }
      #### Response
      Only shows the permissions for roles that they have
        {
          mappings:
          {
              ADMIN: [...Admin Permissions],
              MAINTAINER: [...Maintainer Permissions]
          },
          allRoles: [...All Available Roles]
        }
  * ### `deleteUser`
      #### Data Params
          { }

## Common

## Constants

## Leagues

## Listeners

## On Delete

## On Sign Up

## Players

## Points

## Teams

## Users

## Weekly Teams