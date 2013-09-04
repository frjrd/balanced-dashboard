require('app/models/transaction');

Balanced.Debit = Balanced.Transaction.extend({
    source: Balanced.Model.belongsTo('source', 'Balanced.FundingInstrument'),
    hold: Balanced.Model.belongsTo('hold', 'Balanced.Hold'),
    refunds: Balanced.Model.hasMany('refunds', 'Balanced.Refund'),

    refunded: function() {
        var refunds = this.get('refunds.content');
        var refundAmount = _.filter(refunds, function(refund) {
            return refund.get('id');
        });
        var amount = 0;
        for(var i = 0; i < refundAmount.length; i++){
            amount += refundAmount[i].amount;
        }

        return this.get('status') !== 'failed' && this.get('refunds.isLoaded') && this.get('refunds.content') && this.get('refunds.content').length !== 0 && this.get('amount') === amount;
    }.property('status', 'refunds.isLoaded', 'id', 'amount'),

    type_name: function () {
        return "Debit";
    }.property(),

    funding_instrument_description: function () {
        return this.get('source.description');
    }.property('source.description')
});

Balanced.TypeMappings.addTypeMapping('debit', 'Balanced.Debit');
