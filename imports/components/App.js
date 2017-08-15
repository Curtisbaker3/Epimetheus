import React from 'react';
import ReactDOM from 'react-dom';
import { TextField, RaisedButton, AppBar, Chip } from 'material-ui';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { User, FinancialAgreements, Game } from '/imports/collections/collections';
import FinancialAgreementDisplay from './FinancialAgreementDisplay';




class App extends React.Component {
    constructor() {
        super();

        this.onNewTurn = this.onNewTurn.bind(this);

        this.state = {
            userId: null,
            name: null
        };
    }

   onTradeBuy() {
console.log('cool');
   }

    onNewTurn() {
        Meteor.call('markUserAsReady', this.state.userId);
    }

    render() {
        console.log('im rendering this')
        let gameTitle;
        if (this.props.game) {
            gameTitle = "Epimetheus - turn: " + this.props.game.turn;
        } else {
            gameTitle = "Epimetheus";
        }


        return (
            <div>
                <AppBar title={gameTitle} />
                {this.renderNameEntry()}
                 
                 
                <h1 id="gametitle">Galactic Conquest<span id="playerName"> Player Name</span></h1>

                <h2>Available Offers</h2>
                <FinancialAgreementDisplay financialAgreement={this.props.financialAgreement} />
                <div className="ImprovementContainer">
                    <div className="Improvementcost Improvementcharts">
                        <div className="improvementtitle">Cost</div><br/>
                        $<span id="farmcost">30</span> <br/>
                        $<span id="steelfactorycost">50</span> <br/>
                        $<span id="housecost">100</span> <br/>
                    </div> 
                    <div className="Improvementquantity Improvementcharts">
                        <div className="improvementtitle">You have:</div><br/>
                        <span id="farmquantity">1</span> farms <br/>
                        <span id="steelfactoryquantity">0</span> factories <br/>
                        <span id="housequantity">1</span> houses <br/>
                    </div> 
                    <div className="Productionquantity Improvementcharts">
                        <div className="improvementtitle">Production</div><br/>
                        <span id="foodproduction">10</span> food <br/>
                        <span id="steelproduction">0</span> steel <br/>
                        <span id="maxpopulation">100</span> max pop <br/>
                    </div> 
                    <div className="ImprovementFunction Improvementcharts">
                        <div className="improvementtitle">Function</div><br/>
                        Increases food by: <span id="farmfx">10</span> per turn <br/>
                        Increases steel by: <span id="steelfactoryfx">3</span> per turn <br/>
                        Increases max population by: <script>var houseimprovementfx</script> <br/> 
                    </div>
                    <div className="ImprovementButtons Improvementcharts">
                        <div className="improvementtitle">Improvements</div><br id="space"/>
                        <button type="button" className="Improvementbutton" onClick={this.onbuyfarm}>Farm</button><br/>
                        <button type="button" className="Improvementbutton" onClick={this.onbuysteelfactory}>Steel factory</button><br/>
                        <button type="button" className="Improvementbutton" onClick={this.onbuyhouse}>Housing</button><br/>
                    </div>
                </div>

                <table style={{width:"10%"}}>
                    <tbody>
                    <tr>
                        <td>Cash</td>
                        <td id="CashRow">100</td>
                    </tr>
                    <tr>
                        <td>Income</td>
                        <td id="IncomeRow">0</td>
                    </tr>
                    <tr>
                        <td>Moon Capacity</td>
                        <td id="mooncapacity">20</td>
                    </tr>
                    <tr>
                        <td>Population</td>
                        <td id="populationcurrent">50</td>
                    </tr>
                    </tbody>
                </table>
                
                <p id="FinanicalOfferRow">Cash: + money</p>
                <div id="TurnCounter">Turn: 1</div>


                <button disabled={this.isReady()} type="button" onClick={this.onNewTurn}>New Turn</button>
            </div>
        );
    }

    isReady() {
        user = this.getUser();
        if (!user) {
            return true
        }

        return user.turnReady
    }

    getUser() {
        for (var i = 0; i < this.props.users.length; i++) {
            var u = this.props.users[i];
            if (u._id === this.state.userId) {
                return u;
            }
        }
    }

    handleClick() {
        var name = document.getElementById('name').value;
        // This calls the server to register a user! d
        Meteor.call('registerUser', name, this.callThisWhenFinished.bind(this));
    }

    callThisWhenFinished(error, userId) {
        if (error) {
            console.log('Error: ', error.message);
        } else {
            this.setState({
                userId: userId,
                name: document.getElementById('name').value
            });
        }
    }
    
    renderNameEntry() {
        if (!this.state.name) {
            return (
                <div>
                    <TextField id="name" />
                    <RaisedButton primary={true} label="Join Game" onClick={e => this.handleClick(e)} />
                    
                </div>
            );
        } else {
            let user = this.getUser();
            if (!user) {
                return <div></div>
            }
            let cash = user.cash
            return( 
                <div> 
                    <Chip>{ this.state.name }</Chip>
                    <Chip>{cash}</Chip>
                    {this.props.users.map(u => (
                        <Chip key={u._id}>{u.name}</Chip>
                    ))}
                </div>
            )
        }
    
    }

}

export default createContainer(() => {
    const allUsers = User.find({}).fetch();
    const currentGame = Game.findOne({});
    const activeFinancialAgreement = FinancialAgreements.findOne({ owner: null });

    return {
        users: allUsers,
        game: currentGame, //
        financialAgreement: activeFinancialAgreement
    };
}, App); //info coming from server being passed in as props to App