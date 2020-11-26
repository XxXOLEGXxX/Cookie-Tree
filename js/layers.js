addLayer("cbb", {
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
            title: "I Said MORE Points",
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
            title: "The Best So Far",
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
            cost: new Decimal(3550),
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
            description: "Unspent C.B.B.'s are included into \"The Best So Far\" formula.<br/>[Passive Type]",
            cost: new Decimal(90),
			currencyDisplayName: "chocolate butter biscuits",
			currencyInternalName: "points",
			currencyLayer: "cbb",
            unlocked() { return hasUpgrade("cbb", 22) }, // The upgrade is only visible when this is true
			onPurchase() {
				if(player.points < 4600) player.points = player.points.sub(4550)
				else player.points = player.points.sub(4500)
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
            cost: new Decimal(114),
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
		hiddenPoints: new Decimal(0),
		member: new Decimal(0),
		memberCpS: new Decimal(0),
		oof: new Decimal(0),
    }},

    color: "#C39338",                       // The color for this layer, which affects many elements.
    resource: "cookies",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    update(diff) {
		if(player.c.buyables[21] >= 1) player.c.points = player.c.points.add(new Decimal(diff).mul(buyableEffect("c", 21)))
		if(player.c.buyables[31] >= 1) player.c.points = player.c.points.add(new Decimal(diff).mul(buyableEffect("c", 31)))
		if(player.c.buyables[41] >= 1) player.c.points = player.c.points.add(new Decimal(diff).mul(buyableEffect("c", 41)))
		if(player.c.buyables[51] >= 1) player.c.points = player.c.points.add(new Decimal(diff).mul(buyableEffect("c", 51)))	
		if(player.c.buyables[61] >= 1) player.c.points = player.c.points.add(new Decimal(diff).mul(buyableEffect("c", 61)))
		if(player.c.buyables[21] >= 1) player.c.hiddenPoints = player.c.hiddenPoints.add(new Decimal(diff).mul(buyableEffect("c", 21)))
		if(player.c.buyables[31] >= 1) player.c.hiddenPoints = player.c.hiddenPoints.add(new Decimal(diff).mul(buyableEffect("c", 31)))
		if(player.c.buyables[41] >= 1) player.c.hiddenPoints = player.c.hiddenPoints.add(new Decimal(diff).mul(buyableEffect("c", 41)))
		if(player.c.buyables[51] >= 1) player.c.hiddenPoints = player.c.hiddenPoints.add(new Decimal(diff).mul(buyableEffect("c", 51)))	
		if(player.c.buyables[61] >= 1) player.c.hiddenPoints = player.c.hiddenPoints.add(new Decimal(diff).mul(buyableEffect("c", 61)))
		if(hasUpgrade("c", 41)) player.c.oof = new Decimal(player.c.buyables[51]).div(10).mul(new Decimal(diff))
		if(hasUpgrade("c", 42)) player.c.oof = player.c.oof.mul(3)
		if(hasUpgrade("c", 43)) player.c.oof = player.c.oof.mul(new Decimal(player.c.buyables[51]).log())
		if(hasUpgrade("c", 45)) player.c.oof = player.c.oof.log(3)
		player.c.member = player.c.member.add(player.c.oof)
		if(hasUpgrade("c", 41)) player.c.memberCpS = new Decimal(player.c.buyables[51]).div(10)
		if(hasUpgrade("c", 42)) player.c.memberCpS = player.c.memberCpS.mul(3) 
		if(hasUpgrade("c", 43)) player.c.memberCpS = player.c.memberCpS.mul(new Decimal(player.c.buyables[51]).log())
		if(hasUpgrade("c", 45)) player.c.memberCpS = player.c.memberCpS.div(60).log(3).mul(60)
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
			["display-text", function() {return "You're gaining " + format(buyableEffect("c", 21).add(buyableEffect("c", 31)).add(buyableEffect("c", 41)).add(buyableEffect("c", 51)).add(buyableEffect("c", 61))) + " cookies per second."}],
			["display-text", function() {if(hasUpgrade("c", 41)) return "You're gaining " + format(player.c.memberCpS) + " members per second.<br/>You currently have " + formatWhole(new Decimal(player.c.member).floor()) + " members in your discord servers."}],
			["display-text", function() {if(hasUpgrade("c", 41) && player.c.member >= 100) return "You currently have " + formatWhole(new Decimal(player.c.member).div(100).floor()) + " epic modders in your discord servers, increasing the amount of modders you own and multiplying modders's CpS by " + format(new Decimal(player.c.member).div(100).floor().add(1).root(1.5))}],
			["buyable", 21], ["buyable", 31], ["buyable", 41], ["buyable", 51], ["buyable", 61]]
		},
	    "Upgrades": {
            buttonStyle() {return  {'border-color': '#8F5B39', 'color': 'white'}},
			content:
            [["infobox", "upgrade"],
			"main-display",
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
			      "Unlike C.B.B., it doesn't boost anything by default. You gain cookies via clicking on the giant square-ish cookie or buying buildings for passive gain."
        },
        build: {
            title: "Buildings",
            body: "This is where you'll spend the most of your cookies into. Each building grants certain amount of CPS, increasing the amount of cookies passively.<br/><br/>" +
			      "In order to unlock the buildings, you need to have your total to exceed their cost... Expect for these two buildings. Good luck."
        },
        upgrade: {
            title: "Upgrades",
            body: "This is where you can buy upgrades with all kinds of effects. Some upgrades may give a buff to your buildings, some may modify formula, some may even add in new features! Cool, huh?<br/><br/>" +
			      "Just like buildings, in order to unlock the upgrades, you need to own certain amount of building."
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
			       let up14 = player.c.buyables[31].add(new Decimal(player.c.member).div(100).floor()).div(10).add(player.c.buyables[41].div(10)).add(player.c.buyables[51].div(10))
				   if(hasUpgrade("c", 15) && hasUpgrade("c", 14)) up14 = up14.mul(5)
				   if(hasUpgrade("c", 14)) eff = eff.add(up14)
				   if(hasUpgrade("c", 12)) eff = eff.add(player.c.buyables[21].div(10))
		           if(hasUpgrade("c", 11)) eff = eff.mul(2)
				   if(hasUpgrade("c", 13)) eff = eff.mul(2)
				   player[this.layer].points = player[this.layer].points.add(eff)
				   player[this.layer].hiddenPoints = player[this.layer].hiddenPoints.add(eff)
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
			title() {if(player.c.buyables[21] == 0) return "???"
			         else return "Cursor"},
			display() { return "Cost: " + format(this.cost()) + " cookies. Amount: " + formatWhole(player.c.buyables[21]) + "<br/> CpS: " + format(buyableEffect("c", 21))},
			cost() { return new Decimal(15).mul(new Decimal(1.15).pow(player.c.buyables[21])) },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			effect() { let eff = new Decimal(0.1).mul(player.c.buyables[21])
			           let up14 = player.c.buyables[31].add(new Decimal(player.c.member).div(100).floor()).div(10).add(player.c.buyables[41].div(10)).add(player.c.buyables[51].div(10))
					   if(hasUpgrade("c", 35)) eff = eff.mul(player.c.buyables[41].div(100).add(1))
					   if(hasUpgrade("c", 15) && hasUpgrade("c", 14)) up14 = up14.mul(5)
					   if(hasUpgrade("c", 14)) eff = eff.add(up14)
					   if(hasUpgrade("c", 12)) eff = eff.add(player.c.buyables[21].div(10))
			           if(hasUpgrade("c", 11)) eff = eff.mul(2)
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
			title() {if(player.c.buyables[31] == 0) return "???"
			         else return "Modder"},
			display() { if(player.c.member >= 100) return "Cost: " + format(this.cost()) + " cookies. Amount: " + formatWhole(new Decimal(player.c.buyables[31]).add(new Decimal(player.c.member).div(100).floor())) + "<br/> CpS: " + format(buyableEffect("c", 31))
                        else return "Cost: " + format(this.cost()) + " cookies. Amount: " + formatWhole(player.c.buyables[31]) + "<br/> CpS: " + format(buyableEffect("c", 31))},
			cost() { return new Decimal(100).mul(new Decimal(1.15).pow(player.c.buyables[31])) },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			effect() { let eff = new Decimal(1).mul(player.c.buyables[31])
					   if(hasUpgrade("c", 35)) eff = eff.mul(player.c.buyables[41].div(100).add(1))
					   if(hasUpgrade("c", 21)) eff = eff.mul(2)
					   if(hasUpgrade("c", 22)) eff = eff.mul(new Decimal(player.c.buyables[31]).div(100).add(1))
					   if(hasUpgrade("c", 23)) eff = eff.mul(2)
					   if(hasUpgrade("c", 24)) eff = eff.mul(new Decimal(player.timePlayed).log(3))
					   if(player.c.member >= 100) eff = eff.mul(new Decimal(player.c.member).div(100).floor().add(1).root(1.5)).div(player.c.buyables[31]).mul(player.c.buyables[31].add(new Decimal(player.c.member).div(100).floor()))
                       return eff },
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
		41: {
			title() {if(player.c.buyables[41] == 0) return "???"
			         else return "Discord group"},
			display() { return "Cost: " + format(this.cost()) + " cookies. Amount: " + formatWhole(player.c.buyables[41]) + "<br/> CpS: " + format(buyableEffect("c", 41))},
			cost() { return new Decimal(1100).mul(new Decimal(1.15).pow(player.c.buyables[41])) },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			effect() { let eff = new Decimal(8).mul(player.c.buyables[41])
			           if(hasUpgrade("c", 31)) eff = eff.mul(2)
					   if(hasUpgrade("c", 32)) eff = eff.mul(player.c.buyables[31].div(5).add(1))
					   if(hasUpgrade("c", 33)) eff = eff.mul(2)
                       return eff },
			buy() {
               player[this.layer].points = player[this.layer].points.sub(this.cost())
               player[this.layer].buyables[41] = player[this.layer].buyables[41].add(1)
			},
			unlocked() {return player.c.hiddenPoints >= 1100},
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
		51: {
			title() {if(player.c.buyables[51] == 0) return "???"
			         else return "Discord server"},
			display() { return "Cost: " + format(this.cost()) + " cookies. Amount: " + formatWhole(player.c.buyables[51]) + "<br/> CpS: " + format(buyableEffect("c", 51))},
			cost() { return new Decimal(12000).mul(new Decimal(1.15).pow(player.c.buyables[51])) },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			effect() { let eff = new Decimal(47).mul(player.c.buyables[51])
			           if(hasUpgrade("c", 42)) eff = eff.mul(2)
					   if(hasUpgrade("c", 44)) eff = eff.mul(new Decimal(player.c.buyables[31]).add(player.c.member.div(100).floor()).log(3))
					   if(hasUpgrade("c", 45)) eff = eff.mul(new Decimal(player.c.member).log(10))
					   if(hasUpgrade("c", 35)) eff = eff.mul(player.c.buyables[41].div(100).add(1))
                       return eff },
			buy() {
               player[this.layer].points = player[this.layer].points.sub(this.cost())
               player[this.layer].buyables[51] = player[this.layer].buyables[51].add(1)
			},
			unlocked() {return player.c.hiddenPoints >= 12000},
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
		61: {
			title: "Discord Group",
			display() { return "Cost: " + format(this.cost()) + " cookies. Amount: " + formatWhole(player.c.buyables[61]) + "<br/> CpS: " + format(buyableEffect("c", 61))},
			cost() { return new Decimal(130000).mul(new Decimal(1.15).pow(player.c.buyables[61])) },
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			effect() { let eff = new Decimal(260).mul(player.c.buyables[61])
					   if(hasUpgrade("c", 35)) eff = eff.mul(player.c.buyables[41].div(100).add(1))
                       return eff },
			buy() {
               player[this.layer].points = player[this.layer].points.sub(this.cost())
               player[this.layer].buyables[61] = player[this.layer].buyables[61].add(1)
			},
			unlocked() {return false},
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
		rows: 5,
		cols: 5,
		11: {
			title: "LMB Mashing",
			description: "The mouse and cursors are twice as effecient.<br/>[Multiplier Type]",
			cost: new Decimal(100),
			unlocked() {return player.c.buyables[21] >= 1},
		},
		12: {
			title: "Click Frenzy",
			description: "The mouse and cursors make +0.1 more base CpS per cursor.<br/>[Addition Type]",
			cost: new Decimal(500),
			unlocked() {return player.c.buyables[21] >= 1},
		},
		13: {
			title: "Ambidextrous",
			description: "The mouse and cursors are twice as effecient.<br/>[Multiplier Type]",
			cost: new Decimal(10000),
			unlocked() {return player.c.buyables[21] >= 10},
		},
		14: {
			title: "Thousand Fingers",
			description: "The mouse and cursors make +0.1 more CpS per non-cursor building.<br/>[Addition Type]",
			cost: new Decimal(100000),
			unlocked() {return player.c.buyables[21] >= 25},
		},
		15: {
			title: "Gaming Mouse",
			description: "Multiplies the gain from \"Gaming Mouse\" by 5.<br/>[Multiplier Type]",
			cost: new Decimal(10000000),
			unlocked() {return player.c.buyables[21] >= 50},
		},
		21: {
			title: "Chair of Motivation",
			description: "Modders are twice as effecient.<br/>[Multiplier Type]",
			cost: new Decimal(1000),
			unlocked() {return new Decimal(player.c.buyables[31]).add(new Decimal(player.c.member).div(100).floor()) >= 1},
		},
		22: {
			title: "Copy and Paste",
			description: "Modders gain +1% CpS per modder.<br/>[Multiplier Type]",
			cost: new Decimal(5000),
			unlocked() {return new Decimal(player.c.buyables[31]).add(new Decimal(player.c.member).div(100).floor()) >= 10},
		},
		23: {
			title: "Cookie Dew",
			description: "Modders are twice as effecient.<br/>[Multiplier Type]",
			cost: new Decimal(50000),
			unlocked() {return new Decimal(player.c.buyables[31]).add(new Decimal(player.c.member).div(100).floor()) >= 25},
		},
		24: {
			title: "Actually Learning",
			description: "Modders produce more cookies based on time since the beginning of game.<br/>[Multiplier Type]",
			cost: new Decimal(5000000),
			unlocked() {return new Decimal(player.c.buyables[31]).add(new Decimal(player.c.member).div(100).floor()) >= 50},
		},
		25: {
			title: "Oops...",
			description: "Modders are added into point gain formula after 6 point upgrades.<br/>[Passive Type]",
			cost: new Decimal(500000000),
			unlocked() {return new Decimal(player.c.buyables[31]).add(new Decimal(player.c.member).div(100).floor()) >= 100},
		},
		31: {
			title: "Collaboration",
			description: "Discord groups are twice as effecient.<br/>[Multiplier Type]",
			cost: new Decimal(11000),
			unlocked() {return player.c.buyables[41] >= 1},
		},
		32: {
			title: "Linked Minds",
			description() { return "Discord groups are " + formatWhole(player.c.buyables[31].div(5).add(1)) + "x more effecient. (Effect depends on Modders)<br/>[Multiplier Type]"},
			cost: new Decimal(55000),
			unlocked() {return player.c.buyables[41] >= 10},
		},
		33: {
			title: "Instant Updates",
			description: "Discord groups are twice as effecient.<br/>[Multiplier Type]",
			cost: new Decimal(550000),
			unlocked() {return player.c.buyables[41] >= 25},
		},
		34: {
			title: "New Idea [W.I.P.]",
			description: "Discord groups manages to unlock Golden Cookie feature.<br/>[Passive Type]",
			cost: new Decimal(2).pow(1.79e308),
			unlocked() {return player.c.buyables[41] >= 50},
		},
		35: {
			title: "Big Brain Moment",
			description: "All other buildings gain +1% base CpS per discord group.<br/>[Multiplier Type]",
			cost: new Decimal(5500000000),
			unlocked() {return player.c.buyables[41] >= 100},
		},
		41: {
			title: "Invitation",
			description: "Discord servers are generating +0.1 member per second per Discord server.<br/>[Addition Type]",
			cost: new Decimal(120000),
			unlocked() {return player.c.buyables[51] >= 1},
		},
		42: {
			title: "Advertisement",
			description: "Discord servers are twice as effecient and member gain is thrice as effecient.<br/>[Multiplier Type]",
			cost: new Decimal(600000),
			unlocked() {return player.c.buyables[51] >= 10},
		},
		43: {
			title: "Adding Roles",
			description: "Member gain is more effecient based on discord servers owned.<br/>[Multiplier Type]",
			cost: new Decimal(6000000),
			unlocked() {return player.c.buyables[51] >= 25},
		},
		44: {
			title: "Idle Mod Maker",
			description: "Discord servers are more effecient based on modders.<br/>[Multiplier Type]",
			cost: new Decimal(600000000),
			unlocked() {return player.c.buyables[51] >= 50},
		},
		45: {
			title: "@everyone",
			description: "Discord servers are more effecient based on members... With inexchange of having MpS root cubed. <br/>[Passive Type]",
			cost: new Decimal(60000000000),
			unlocked() {return player.c.buyables[51] >= 100},
		},
	}
})
