function calculateOutstanding(fee){

    return fee.total_fee -

        fee.paid_amount;

}

module.exports={

    calculateOutstanding

};