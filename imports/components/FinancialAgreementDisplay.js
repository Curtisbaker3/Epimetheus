import React from 'react';

const FinancialAgreementDisplay = (props) => {
    let tempFATypeString = '';
    let tempAmount = '';
    let tempRate = '';
    let tempGeneratedAmt = '';
    let FA = props.financialAgreement;

    if (FA) { //checks if it exists, and waits for it to be ready
        if (FA.type === 'trade') {
            tempFATypeString = 'Trade Center';
        } else {
            tempFATypeString = 'Bank Center';
        }
        tempAmount = FA.amount;
        tempRate = FA.rate;
        tempGeneratedAmt = Number(FA.amount * FA.rate / 100).toFixed(2);
    }
    
    return (
        <p> 
            {tempFATypeString} : ${tempAmount} at {tempRate}%. Generates ${tempGeneratedAmt}
            <button type="button" onClick={this.onTradeBuy}>Buy Trade Center</button>
        </p>
    )
};

export default FinancialAgreementDisplay;