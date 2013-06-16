ready(function(){
function refresh() {
    server.reload();
    load('js-plugins/alphacraft/main.js');
}

var Entity_Types = org.bukkit.entity.EntityType;

var MobBlaster = (function() {
    var permissions = load('js-plugins/alphacraft/permissions.jsn'),
        game = {};

    echo(permissions);

    // Initialize the game
    game.init = function() {

    };

    game.getBlock

    game.createChickens = function(player, count) {
        var world = self.world;
        for (var i = 0; i < count; i++) {
            world.spawnCreature(player.location, Entity_Types.CHICKEN);
        }
    };

    game.createEntities = function(player, entityType, count) {
        var world = self.world;
        for (var i = 0; i < count; i++) {
            world.spawnCreature(player.location, entityType);
        }
    };

    game.thisIsTheEnd = function(killPlayer) {
        killPlayer = (killPlayer === true);

        var ve = self.world.livingEntities;
        for (var i = 0, len = ve.size(); i < len; i++) {
            var entity = ve.get(i);
            if (!killPlayer && entity === self) {
                continue;
            }
            entity.health = 0;
        }
    };

    game.createEntity = function(location, entityType) {
        var world = self;
        return world.spawnCreature(location, entityType);
    };

    game.creeperArrows = function(listener, event) {
        for (var keys = Object.keys(event), i = 0, len = keys.length; i < len; i++) {
            echo(keys[i]);
        }

        var arrow = event.entity,
            world = arrow.world,
            shooter = arrow.shooter;

        if (arrow instanceof org.bukkit.entity.Arrow) {
            var creeper = world.spawnCreature(arrow.location, Entity_Types.CREEPER);
            creeper.setTarget(shooter);
        }
    };

    events.on("entity.ProjectileHitEvent", game.creeperArrows);
    /*
    events.on("block.BlockBreakEvent", function(listener, event) {
        var name = event.getPlayer().getName().toLowerCase();
        if (!permissions[name].canBreakBlocks) {
            event.setCancelled(true);
        }
    });
    */

    return game;
})();

MobBlaster.init();
})