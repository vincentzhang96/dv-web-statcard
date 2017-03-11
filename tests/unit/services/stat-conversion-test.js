import { moduleFor, test } from 'ember-qunit';

moduleFor('service:stat-conversion', 'Unit | Service | stat conversion', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

/*  =========================================================================
        CRITICAL
    ========================================================================= */

test('Critical min is 0%', function(assert) {
  let service = this.subject();
  assert.equal(service.getCriticalPercent(0, 80), 0.0, 'Critical minimum is incorrect');
});

test('Critical is capped', function(assert) {
  let service = this.subject();
  assert.equal(service.getCriticalPercent(10e10, 80), 0.89, 'Critical not capped');
});

test('Critical level out of range returns -1', function(assert) {
  let service = this.subject();
  assert.equal(service.getCriticalPercent(0, 0), -1, 'Critical not -1');
  assert.equal(service.getCriticalPercent(0, 101), -1, 'Critical not -1');
});

test('Critical midrange values are correct', function(assert) {
  let service = this.subject();
  assert.ok(Math.abs(service.getCriticalPercent(200000, 90) - 0.844) < 0.0005,
    "Critical calculation is not accurate to the tenth of a percent");
});

/*  =========================================================================
        CRITICAL DAMAGE
    ========================================================================= */

test('Critdmg min is 200%', function(assert) {
  let service = this.subject();
  assert.equal(service.getCritDamagePercent(0, 80), 2.0, 'Critdmg minimum is incorrect');
});

test('Critdmg is capped', function(assert) {
  let service = this.subject();
  assert.equal(service.getCritDamagePercent(10e10, 80), 3.0, 'Critdmg cap is incorrect');
});

test('Critdmg level out of range returns -1', function(assert) {
  let service = this.subject();
  assert.equal(service.getCritDamagePercent(0, 0), -1, 'Critdmg not -1');
  assert.equal(service.getCritDamagePercent(0, 101), -1, 'Critdmg not -1');
});

test('Critdmg midrange values are correct', function(assert) {
  let service = this.subject();
  assert.ok(Math.abs(service.getCritDamagePercent(500000, 90) - 2.745) < 0.0005,
    "Critdmg calculation is not accurate to the tenth of a percent");
});

/*  =========================================================================
        DEFENSE
    ========================================================================= */

test('Defense min is 0%', function(assert) {
  let service = this.subject();
  assert.equal(service.getDefensePercent(0, 80), 0.0, 'Defense minimum is incorrect');
});

test('Defense is capped', function(assert) {
  let service = this.subject();
  assert.equal(service.getDefensePercent(10e10, 80), 0.85, 'Defense cap is incorrect');
});

test('Defense level out of range returns -1', function(assert) {
  let service = this.subject();
  assert.equal(service.getDefensePercent(0, 0), -1, 'Defense not -1');
  assert.equal(service.getDefensePercent(0, 101), -1, 'Defense not -1');
});

test('Defense midrange values are correct', function(assert) {
  let service = this.subject();
  assert.ok(Math.abs(service.getDefensePercent(50000, 90) - 0.302) < 0.0005,
    "Defense calculation is not accurate to the tenth of a percent");
});

/*  =========================================================================
        FINAL DAMAGE
    ========================================================================= */
    
test('FD min is 0%', function(assert) {
  let service = this.subject();
  assert.equal(service.getFinalDamagePercent(0, 80), 0.0, 'FD minimum is incorrect');
});

test('FD is capped', function(assert) {
  let service = this.subject();
  assert.equal(service.getFinalDamagePercent(10e10, 80), 1.0, 'FD cap is incorrect');
});

test('FD level out of range returns -1', function(assert) {
  let service = this.subject();
  assert.equal(service.getFinalDamagePercent(0, 0), -1, 'FD not -1');
  assert.equal(service.getFinalDamagePercent(0, 101), -1, 'FD not -1');
});

test('FD midrange values are correct', function(assert) {
  let service = this.subject();
  assert.ok(Math.abs(service.getFinalDamagePercent(6000, 90) - 0.878) < 0.0005,
    "FD EXP calculation is not accurate to the tenth of a percent");
  assert.ok(Math.abs(service.getFinalDamagePercent(1000, 90) - 0.055) < 0.0005,
    "FD LIN calculation is not accurate to the tenth of a percent");
});
