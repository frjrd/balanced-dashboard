Balanced.Debit = Balanced.Transaction.extend({
    source: Balanced.Model.belongsTo('source', 'Balanced.FundingInstrument'),
    hold: Balanced.Model.belongsTo('hold', 'Balanced.Hold'),
    refunds: Balanced.Model.hasMany('refunds', 'Balanced.Refund'),

    refunded: function() {
        return this.get('refunds');
    }.property('refunds'),

    type_name: function () {
        return "Debit";
    }.property(),

    funding_instrument_description: function () {
        return this.get('source.description');
    }.property('source.description')
});

Balanced.TypeMappings.addTypeMapping('debit', 'Balanced.Debit');
