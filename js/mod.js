let modInfo = {
	name: "The Cookie Tree",
	id: "orteiltree",
	author: "Holy Broly",
	pointsName: "points",
	discordName: "",
	discordLink: "",
	changelogLink: "https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "v0.001.001",
	name: "Speed Busting Update",
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasUpgrade("cbb", 11)) gain = gain.add(1)
	if(hasUpgrade("cbb", 12)) gain = gain.add(2)
	if(hasUpgrade("cbb", 13)) gain = gain.mul(upgradeEffect("cbb", 13))
	if(hasUpgrade("cbb", 22) && hasUpgrade("cbb", 112)) gain = gain.add(player.cbb.best).add(player.cbb.points)
	else if(hasUpgrade("cbb", 22)) gain = gain.add(player.cbb.best)
	if(hasUpgrade("cbb", 21)) gain = gain.mul(upgradeEffect("cbb", 21))
	gain = gain.mul(layers.cbb.effect())
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
function() {if(player.cbb.points < 26) return "Current chocolate butter biscuits effect: 1.1^Nx."
else if(hasUpgrade("cbb", 23)) return "Current chocolate butter biscuits effect:<br/>1.1^N*(0.85^(N-25))x (Softcapped)."
else return "Current chocolate butter biscuits effect:<br/>1.1^N*(0.8^(N-25))x (Softcapped)."
}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600000) // Default is 1 hour which is just arbitrarily large
}
