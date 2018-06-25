/*module.exports = function(sequelize, Sequelize) {

  var CasinoBot = sequelize.define('CasinoBot', {

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    firstname: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    lastname: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    username: {
      type: Sequelize.TEXT
    },

    about: {
      type: Sequelize.TEXT
    },

    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    last_login: {
      type: Sequelize.DATE
    },

    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }


  });

  return CasinoBot;

};*/

var mongoose = require('mongoose');

var CasinoBotSchema = new mongoose.Schema({
  stage1: {
    general: {
      selectedValueGameGeneralStage1: String,
      gamesGeneralStage1: [{
        value: String,
        viewValue: String
      }],
      selectedValueProviderGeneralStage1: String,
      providersGeneralStage1: [{
        value: String,
        viewValue: String
      }]
    },
    blackjack: {
      selectedValueProviderBlackjackStage1: String,
      providersBlackjackStage1: [{
        value: String,
        viewValue: String
      }],
      ELEMENT_DATA_MAIN: [{
        name: String,
        value: String
      }],
      isMoneyGameBlackjack: Boolean,
      isAutoPlayBlackjack: Boolean,
      isStage1Blackjack: Boolean,
      isForceStage2Blackjack: Boolean,
      dataOptionsBlackjack: {
        amountOfReplenishment: Number,
        maxCountGamesStage1: Number,
        maxWinGamesStage1: Number,
        maxBalanceStage1: Number,
        maxWinGamesStage2: Number,
        maxBalanceStage2: Number
      },
      ELEMENT_DATA_BETTING: [{
        item: String,
        player: Boolean,
        bet: Number
      }]
    },
    roulette: {
      setNumbersRouletteStage1: [{
        value: String,
        viewValue: String
      }],
      numberSet: Number,
      betSet: Number,
      betNumbers: Number,
      selectedVariantRouletteRouletteStage1: String,
      variantRoulette: [{
        value: String,
        viewValue: String
      }],
      isMoneyGameRoulette: Boolean,
      isStage1Roulette: Boolean,
      isForceStage2Roulette: Boolean,
      dataOptionsRoulette: {
        amountOfReplenishment: Number,
        maxCountGamesStage0: Number,
        maxWinGamesStage0: Number,
        maxBalanceStage0: Number,
        maxWinGamesStage1: Number,
        maxBalanceStage1: Number
      },
      ELEMENT_DATA_ROULETTE: [{
        setNumbers: String,
        bets: Number,
        sessionBet: Boolean
      }]
    },
    slots: {
      selectedVariantSlots: String,
      variantSlots: [{
        value: String,
        viewValue: String
      }],
      selectedBetPerLine: Number,
      betPerLine: [Number],
      selectedCoinValue: Number,
      coinValue: [Number],
      dataOptionsSlots: {
        amountOfReplenishment: Number,
        maxCountGamesStage0: Number,
        maxWinGamesStage0: Number,
        maxBalanceStage0: Number,
        maxWinGamesStage1: Number,
        maxBalanceStage1: Number
      },
      isMoneyGameSlot: Boolean,
      isStage1Slot: Boolean,
      isForceStage2Slot: Boolean,
    }
  }
});

module.exports = mongoose.model('CasinoBot', CasinoBotSchema);
