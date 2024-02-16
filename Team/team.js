// Purpose: This file contains the class for the team object.

const fs = require('fs');
const teamFilePath = './teams.json';

class TeamManager {
    constructor() {
        this.teams = this.loadTeams();
    }

    loadTeams() {
        try {
            const data = fs.readFileSync(teamFilePath, 'utf8');
            const teams = JSON.parse(data);
            return teams.map(team => new Team(team.name, team.icon, team.size, team.members));
        } catch (error) {
            console.error('Error loading teams:', error);
            return [];
        }
    }

    saveTeams() {
        const data = JSON.stringify(this.teams, null, 4);
        fs.writeFileSync(teamFilePath, data, 'utf8');
    }

    addTeam(team) {
        this.teams.push(team);
        this.saveTeams();
    }

    removeTeam(teamID) {
        this.teams = this.teams.filter(team => team.teamID !== teamID);
        this.saveTeams();
    }

    // Implement other methods as needed for updating teams, etc.
}





class team {

    // Constructor
    constructor(name, size) {
        this.name = name;
        this.icon = icon; // Icon is a link to an image
        this.size = size;
        this.points = 0; // Points start at 0
        this.members = members;
        this.boardLocation = 0; // 0 is the start of the board
        this.teamID = generateTeamID();
    }

    // Getters and Setters
    getName() {
        return this.name;
    }

    getIcon() {
        return this.icon;
    }

    getPoints() {
        return this.points;
    }

    getMembers() {
        return this.members;
    }

    getBoardLocation() {
        return this.boardLocation;
    }

    setName(name) {
        this.name = name;
    }

    setIcon(icon) {
        this.icon = icon;
    }

    setSize(size) {
        this.size = size;
    }

    setBoardLocation() {
        this.boardLocation = boardLocation;
    }

    setPoints(points) {
        this.points = points;
    }

    // Methods
    moveForward(spaces) {
        if (this.boardLocation + spaces > boardEnd) {
            console.info("Cannot move forward that far. You have reached the end.");
        } else {
            this.boardLocation += spaces;
        }
    }

    moveBackward(spaces) {
        if (this.boardLocation - spaces < 0) {
            console.info("Cannot move back that far.");
        } else {
            this.boardLocation -= spaces;
        }

    }

    addPoints(points) {
        this.points += points;
    }

    removePoints(points) {
        if (this.points - points < 0) {
            console.info("Cannot remove that many points. You have reached 0 points.");
        } else {
            this.points -= points;
        }
    }

    addMember(member) {
        this.members.push(member);
    }

    removeMember(member) {
        this.members.pop(member);
    }

    generateTeamID() {
        // Generate a unique team ID (random int between 1 and 10000)
        return Math.floor(Math.random() * 10000) + 1;
    }

    // toString
    toString() {
        return `Team: ${this.name} \nIcon: ${this.icon} \nSize: ${this.size} \nPoints: ${this.points} \nMembers: ${this.members}`;
    }


}

