<template>
  <nav class="navbar navbar-fixed-top navbar-inverse">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#navbar"
          aria-expanded="false"
          aria-controls="navbar"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/home">
          <a class="navbar-brand">The Stock Trader</a>
        </router-link>
      </div>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="nav navbar-nav">
          <router-link tag="li" to="/" activeClass="active">
            <a>Home</a>
          </router-link>

          <router-link tag="li" to="/portfolio" activeClass="active">
            <a>MyTradings</a>
          </router-link>
          <router-link tag="li" to="/stocks" activeClass="active">
            <a>Stocks</a>
          </router-link>
        </ul>
        <form class="navbar-form navbar-left">
          <div class="form-group">
            <input
              type="number"
              class="form-control"
              :placeholder="funds | currency"
              v-model="nFunds"
            />
          </div>
          <button v-show="funds <= 100" class="btn btn-default" @click.prevent="setFunds(nFunds)">Apply</button>
        </form>
        <ul class="nav navbar-nav navbar-right">
          <!-- <li @click.prevent="endDay"><a>End Day</a></li> -->
          <li
            class="dropdown"
            :class="{open: isDropdownOpen}"
            @click="isDropdownOpen = !isDropdownOpen"
            v-click-outside="toggle"
          >
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Save & Load
              <span class="caret"></span>
            </a>

            <ul class="dropdown-menu">
              <li>
                <a @click="saveData">Save Data</a>
              </li>
              <li>
                <a @click="getData">Load Data</a>
              </li>
              <!-- <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>-->
            </ul>
          </li>
          <li v-if="!auth" @click="modal = !modal">
            <a>
              <span class="glyphicon glyphicon-log-in"></span> LogIn | Register
            </a>
          </li>
          <li v-if="auth" @click="logOut">
            <a>
              <span class="glyphicon glyphicon-log-out"></span> LogOut
            </a>
          </li>
        </ul>
        <transition name="logIn" mode="out-in">
          <app-login @loggedIn="modal = false" v-show="modal"></app-login>
        </transition>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
</template>
<script>
import { funds } from "@/mixins/fundsDisplay.js";
import { mapActions } from "vuex";
import login from "../views/LogIn.vue";


export default {
  mixins: [funds],
  components: {
    appLogin: login
  },
  data() {
    return {
      nFunds: null,
      isDropdownOpen: false,
      modal: false
    };
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.push("/stocks");
    },
    setFunds(nFunds) {
      const newfunds = {
        funds: nFunds
      };
      this.$store.dispatch("setFunds", newfunds);
      this.nFunds = null;
    },
    toggle() {
      return (this.isDropdownOpen = false);
    },
    // ...mapActions({
    //   randomizeStocks: 'randomizeStocks'
    // }),
    saveData() {
      const data = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio
      };
    this.$store.dispatch("saveData", data);
    },
    getData() {
      this.$store.dispatch("loadData");
    },
    modalClose() {
      this.modal = false;
    }
  }
};
</script>
<style lang="css" scoped>
li {
  cursor: pointer;
}
.logIn-enter-active {
  animation: logIn-in 600ms ease-out forwards;
  position: absolute;
  right: 0px;
  z-index: 99;
}
.logIn-leave-active {
  animation: logIn-out 600ms ease-out forwards;
  position: absolute;
  right: 0px;
  z-index: 99;
}

@keyframes logIn-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
@keyframes logIn-out {
  from {
    transform: translateY(0px);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>