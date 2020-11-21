addLayer("cbb", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CBB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
	update() {
    player.cbb.points = player.points.div(50).sub(1).floor().max(0)
	if(player.cbb.best - player.cbb.points >  0) player.cbb.best = player.cbb.best
	else player.cbb.best = player.cbb.points
	},
    tabFormat: {
	    "Points": {
            buttonStyle() {return  {'border-color': 'white', 'color': 'white'}},
			content:
            [["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]],], ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23]],]]
		},
	    "C.B.B.": {
            buttonStyle() {return  {'border-color': '#DDB466', 'color': '#6A220F'}},
			content:
            [["infobox", "lore"],
            "main-display",
			["display-text", function() {return "Your best C.B.B. is " + player.cbb.best}],
			["row", [["upgrade", 111], ["upgrade", 112], ["upgrade", 113]],]],
		},
	},
    color: "#DDB466",
    resource: "chocolate butter biscuits", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
	effect() {
		if(player.cbb.points < 26) return new Decimal(1.1).pow(player.cbb.points)
		else if (hasUpgrade("cbb", 23)) return new Decimal(1.1).pow(player.cbb.points).mul(new Decimal(0.85).pow(player.cbb.points.sub(25)))
		else return new Decimal(1.1).pow(player.cbb.points).mul(new Decimal(0.8).pow(player.cbb.points.sub(25)))
	    
	},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    infoboxes: {
        lore: {
            title: "Chocolate butter biscuits",
            body: "If you have forgot what C.B.B. does or never played Cookie Clicker before, then this infobox will remind you.<br/><br/>" +
			      "C.B.B. is your first currency in this mod, with which you can spent on upgrades. C.B.B. also boosts your points by the amount of C.B.B. you have.<br/><br/>" +
			      "You get your first chocolate butter biscuit while having 100 unspent points. After that, you'll be getting one chocolate butter biscuit for every 50 unspent points on top of 100. C.B.B. is linked to the points directly, meaning that you'll have to keep points in order to purchase C.B.B. upgrades."
        }
    },
    upgrades: {
        rows: 999,
        cols: 3,
	        11: {
            title: "Additional generator",
            description: "Generates one more point per second.<br/>[Addition Type]",
            cost: new Decimal(10),
			currencyDisplayName: "points",
			currencyInternalName: "points",
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
			style() {
                    if (hasUpgrade(this.layer, this.id)) return {
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) {
                        }
			    else {
					return {
					    'background-color': '#F0F0F0'
					}
				}
			}
        },
	    12: {
            title: "I said MORE points",
            description: "Generates two more points per second.<br/>[Addition Type]",
            cost: new Decimal(20),
			currencyDisplayName: "points",
			currencyInternalName: "points",
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
			style() {
                    if (hasUpgrade(this.layer, this.id)) return {
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) {
                        }
			    else {
					return {
					    'background-color': '#F0F0F0'
					}
				}
			}
        },
	    13: {
            title: "Generator-intator.",
            description: "You gain more points based on point upgrades.<br/>[Multiplier Type]",
            cost: new Decimal(70),
			currencyDisplayName: "points",
			currencyInternalName: "points",
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
			effect() {let inator = new Decimal(0)
					  for (let x = 10; x <= 30; x += 10) for (let y = 1; y <= 3; y++) {
					  var z = x + y
			          if(hasUpgrade("cbb", z)) inator = inator.add(1)
					  }
			          return new Decimal(1.1).pow(inator)},
			effectDisplay() { return format(this.effect()) + "x." },
			style() {
                    if (hasUpgrade(this.layer, this.id)) return {
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) {
                        }
			    else {
					return {
					    'background-color': '#F0F0F0'
					}
				}
			}
        },
		21: {
            title: "Point Boost",
            description: "Point gain is based on unspent points. [Multiplier Type]",
            cost: new Decimal(150),
			currencyDisplayName: "points",
			currencyInternalName: "points",
			effect() { return player.points.log(10).max(1) },
			effectDisplay() { return format(this.effect()) + "x." },
            unlocked() { return hasUpgrade("cbb", 111) }, // The upgrade is only visible when this is true
			style() {
                    if (hasUpgrade(this.layer, this.id)) return {
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) {
                        }
			    else {
					return {
					    'background-color': '#F0F0F0'
					}
				}
			}
        },
		22: {
            title: "The best so far",
            description: "You gain more points per second BEFORE the previous upgrade effect based on best C.B.B.'s. [Addition Type]",
            cost: new Decimal(375),
			currencyDisplayName: "points",
			currencyInternalName: "points",
            unlocked() { return hasUpgrade("cbb", 111) }, // The upgrade is only visible when this is true
			style() {
                    if (hasUpgrade(this.layer, this.id)) return {
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) {
                        }
			    else {
					return {
					    'background-color': '#F0F0F0'
					}
				}
			}
        },
		23: {
            title: "Second Breath",
            description: "Reduces softcap's strength.<br/>(0.8 => 0.85) [Passive Type]",
            cost: new Decimal(3100),
			currencyDisplayName: "points",
			currencyInternalName: "points",
            unlocked() { return hasUpgrade("cbb", 111) }, // The upgrade is only visible when this is true
			style() {
                    if (hasUpgrade(this.layer, this.id)) return {
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) {
                        }
			    else {
					return {
					    'background-color': '#F0F0F0'
					}
				}
			}
        },
        111: {
            title: "Crappy Puns Flavoured C.B.B.",
            description: "Unlocks 3 more point upgrades.",
            cost: new Decimal(1),
			currencyDisplayName: "chocolate butter biscuit",
			currencyInternalName: "points",
			currencyLayer: "cbb",
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
			onPurchase() {
				if(player.points < 150) player.points = player.points.sub(100)
				else player.points = player.points.sub(50)
			    player.cbb.spentPoints = player.cbb.spentPoints.add(1)
			},
			style() {
                    if (hasUpgrade(this.layer, this.id)) return {
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) {
                        }
			    else {
					return {
					    'background-color': '#DDB466'
					}
				}
			}
        },
        112: {
            title: "Chocolate Flavoured C.B.B.",
            description: "Unspent C.B.B.'s are included into \"The best so far\" formula.<br/>[Passive Type]",
            cost: new Decimal(75),
			currencyDisplayName: "chocolate butter biscuits",
			currencyInternalName: "points",
			currencyLayer: "cbb",
            unlocked() { return hasUpgrade("cbb", 22) }, // The upgrade is only visible when this is true
			onPurchase() {
				if(player.points < 3850) player.points = player.points.sub(3800)
				else player.points = player.points.sub(3750)
			    player.cbb.spentPoints = player.cbb.spentPoints.add(1)
			},
			style() {
                    if (hasUpgrade(this.layer, this.id)) return {
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) {
                        }
			    else {
					return {
					    'background-color': '#DDB466'
					}
				}
			}
        },
        113: {
            title: "Cookie Flavoured C.B.B.",
            description: "Unlocks new layer.",
            cost: new Decimal(100),
			currencyDisplayName: "chocolate butter biscuits",
			currencyInternalName: "points",
			currencyLayer: "cbb",
            unlocked() { return hasUpgrade("cbb", 22) }, // The upgrade is only visible when this is true
			onPurchase() {
				if(player.points < 5100) player.points = player.points.sub(5050)
				else player.points = player.points.sub(5000)
			    player.cbb.spentPoints = player.cbb.spentPoints.add(1)
			},
			style() {
                    if (hasUpgrade(this.layer, this.id)) return {
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) {
                        }
			    else {
					return {
					    'background-color': '#DDB466'
					}
				}
			}
        },
	},
})

addLayer("c", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#C39338",                       // The color for this layer, which affects many elements.
    resource: "cookies",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    update(diff) {
		if(player.c.buyables[21] >= 1) player.c.points = player.c.points.add(new Decimal(diff).mul(buyableEffect("c", 21)))
		if(player.c.buyables[31] >= 1) player.c.points = player.c.points.add(new Decimal(diff).mul(buyableEffect("c", 31)))	
	},

    requires: new Decimal(100),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.
    tabFormat: {
	    "Cookie": {
            buttonStyle() {return  {'border-color': '#340C02', 'color': '#C39338'}},
			content:
            [["infobox", "lore"],
            "main-display",
			"blank",
			["buyable", 11]]
		},
	    "Buildings": {
            buttonStyle() {return  {'border-color': '#898770', 'color': '#B6B0A0'}},
			content:
            [["infobox", "build"],
            "main-display",
			["display-text", function() {return "You're gaining " + format(buyableEffect("c", 21).add(buyableEffect("c", 31))) + " cookies per second."}],
			["buyable", 21], ["buyable", 31]]
		},
	    "Upgrades": {
            buttonStyle() {return  {'border-color': '#8F5B39', 'color': 'white'}},
			content:
            ["main-display",
			"upgrades"]
		},
	    "Achievements": {
            buttonStyle() {return  {'border-color': '#424242', 'color': 'white'}},
			content:
            [["infobox", "achiev"],
            ["display-text", function() {return "what achievements. we do have better mods tho."},
            {"color": "white", "font-size": "10px", "font-family": "Comic Sans MS",}]],
		},
    },

    type: "none",                         // Determines the formula used for calculating prestige currency.
    exponent: 1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    layerShown() { return hasUpgrade("cbb", 113) },            // Returns a bool for if this layer's node should be visible in the tree.
    infoboxes: {
        lore: {
            title: "Cookies",
            body: "Welcome to the second layer, where cookies becomes the most important currency you have from now on.<br/><br/>" +
			      "Unlike C.B.B., it doesn't boost anything by default. You gain cookies via clicking on the giant square-ish cookie or buying buyables for passive gain."
        },
        build: {
            title: "Buildings",
            body: "This is where you'll spend the most of your cookies into. Each building grants certain amount of CPS, increasing the amount of cookies passively.<br/><br/>" +
			      "Oh and by the way. In order to unlock the buildings, you need to have your total exceed their cost."
        },
        achiev: {
            title: "Achievements",
            body: "Mostly self-explanatory, there's nothing much to talk about with an exception of one feature - Milk.<br/><br/>" +
			      "Each milk grants all of your buildings quite solid boost to their CPS. You can get milks by completing achievements while playing."
        },
    },
	buyables: {
		rows: 3,
		cols: 1,
		11: {
			display() { return "OH BOY, HERE COMES THE GIANT COOKIE." },
			canAfford() { return true },
			buy() {let eff = new Decimal(1)
			       if(hasUpgrade("c", 15) && hasUpgrade("c", 14)) eff = eff.add(new Decimal(player.c.buyables[21]).div(2))
				   else if(hasUpgrade("c", 14)) eff = eff.add(new Decimal(player.c.buyables[21]).div(10))
		           if(hasUpgrade("c", 11)) eff = eff.mul(2)
				   if(hasUpgrade("c", 12)) eff = eff.mul(player.c.buyables[21].div(10).add(1))
				   if(hasUpgrade("c", 13)) eff = eff.mul(2)
				   player[this.layer].points = player[this.layer].points.add(eff)
			},
        style() {
                return {
                'border-color': '#60351D',
				'background-color': '#9C703C',
				'color': '#4E2924',
				'font-size': '49px',
                'height': '488px',
                'width': '484px'
				}
		},
		},
		21: {
			title: "Cursor",
			display() { return "Cost: " + format(this.cost()) + " cookies. Amount: " + formatWhole(player.c.buyables[21]) + "<br/> CPS: " + format(buyableEffect("c", 21))},
			cost() { return new Decimal(10).mul(new Decimal(1.15).pow(player.c.buyables[21])) },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			effect() { let eff = new Decimal(0.1)
					   if(hasUpgrade("c", 15) && hasUpgrade("c", 14)) eff = eff.add(new Decimal(player.c.buyables[21]).div(2))
					   else if(hasUpgrade("c", 14)) eff = eff.add(new Decimal(player.c.buyables[21]).div(10))
			           if(hasUpgrade("c", 11)) eff = eff.mul(2)
					   if(hasUpgrade("c", 12)) eff = eff.mul(player.c.buyables[21].div(10).add(1))
					   if(hasUpgrade("c", 13)) eff = eff.mul(2)
                       return eff },
			buy() {
               player[this.layer].points = player[this.layer].points.sub(this.cost())
               player[this.layer].buyables[21] = player[this.layer].buyables[21].add(1)
			},
        style() {
			    if(player[this.layer].points.gte(this.cost()))
                return {
                'border-color': '#898770',
				'background-color': '#B6B0A0',
				'color': '#736E5F',
				'font-size': '15px',
                'height': '64px',
                'width': '300px'
				}
				else return {
				'border-color': '#444337',
				'background-color': '#5B5850',
				'color': '#39372F',
				'font-size': '15px',
                'height': '64px',
                'width': '300px'
				}
		},
		},
		31: {
			title: "Modder",
			display() { return "Cost: " + format(this.cost()) + " cookies. Amount: " + formatWhole(player.c.buyables[31]) + "<br/> CPS: " + format(buyableEffect("c", 31))},
			cost() { return new Decimal(100).mul(new Decimal(1.15).pow(player.c.buyables[31])) },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			effect() { return player.c.buyables[31] },
			buy() {
               player[this.layer].points = player[this.layer].points.sub(this.cost())
               player[this.layer].buyables[31] = player[this.layer].buyables[31].add(1)
			},
        style() {
			    if(player[this.layer].points.gte(this.cost()))
                return {
                'border-color': '#898770',
				'background-color': '#B6B0A0',
				'color': '#736E5F',
				'font-size': '15px',
                'height': '64px',
                'width': '300px'
				}
				else return {
				'border-color': '#444337',
				'background-color': '#5B5850',
				'color': '#39372F',
				'font-size': '15px',
                'height': '64px',
                'width': '300px'
				}
		},
		},
	},
	upgrades: {
		rows: 1,
		cols: 5,
		11: {
			title: "LMB Mashing",
			description: "The mouse and cursors are twice as effecient.<br/>[Passive Type]",
			cost: new Decimal(100),
		},
		12: {
			title: "Click Frenzy",
			description: "The mouse and cursors make +0.1 more cookies per cursor.<br/>[Passive Type]",
			cost: new Decimal(500),
		},
		13: {
			title: "Ambidextrous",
			description: "The mouse and cursors are twice as effecient.<br/>[Passive Type]",
			cost: new Decimal(10000),
		},
		14: {
			title: "Thousand Fingers",
			description: "The mouse and cursors make +0.1 more cookies per non-cursor buildings.<br/>[Passive Type]",
			cost: new Decimal(100000),
		},
		15: {
			title: "Gaming Mouse",
			description: "Multiplies the gain from \"Gaming Mouse\" by 5.<br/>[Passive Type]",
			cost: new Decimal(10000000),
		},
	}
})