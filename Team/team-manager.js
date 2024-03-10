const { Team } = require('discord.js');
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
            return teams.map(
                (team) => new Team(team.name, team.icon, team.size, team.members),
            );
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
        this.teams = this.teams.filter((team) => team.teamID !== teamID);
        this.saveTeams();
    }

    // Implement other methods as needed for updating teams, etc.
}