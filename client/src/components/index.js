import * as sim from "lib-simulation-wasm";
import { Terminal } from "./js/terminal";
import { Viewport } from "./js/viewport";



const terminal = new Terminal(
    document.getElementById("terminal-stdin"),
    document.getElementById("terminal-stdout"),
);

const viewport = new Viewport(
    document.getElementById("viewport"),
);


let simulation = new sim.Simulation(sim.Simulation.default_config());


let active = true;
let generationNum = 0;

const config = simulation.config();


// terminal.println("");
// terminal.println("---- Commands ----");
// terminal.println("");
// terminal.println("- p / pause");
// terminal.println("  Pauses (or resumes) the simulation");
// terminal.println("");
// terminal.println(`- r / reset [animals=${config.world_animals}] [f=${config.world_foods}] [...]`);
// terminal.println("  Starts simulation from scratch with given optional");
// terminal.println("  parameters:");
// terminal.println("");
// terminal.println(`  * a / animals (default=${config.world_animals})`);
// terminal.println("    number of animals");
// terminal.println("");
// terminal.println(`  * f / foods (default=${config.world_foods})`);
// terminal.println("    number of foods");
// terminal.println("");
// terminal.println(`  * n / neurons (default=${config.brain_neurons})`);
// terminal.println("    number of brain neurons per each animal");
// terminal.println("");
// terminal.println(`  * p / photoreceptors (default=${config.eye_cells})`);
// terminal.println("    number of eye cells per each animal");
// terminal.println("");
// terminal.println("  Examples:");
// terminal.println("    reset animals=100 foods=100");
// terminal.println("    r a=100 f=100");
// terminal.println("    r p=3");
// terminal.println("");
// terminal.println("- (t)rain [how-many-generations]");
// terminal.println("  Fast-forwards one or many generations, allowing to");
// terminal.println("  observe the learning process faster.");
// terminal.println("");
// terminal.println("  Examples:");
// terminal.println("    train");
// terminal.println("    t 5");
// terminal.println("");
// terminal.println("---- Advanced Tips™ ----");
// terminal.println("");
// terminal.println("- `reset` can modify *all* of the parameters:");
// terminal.println("");
// terminal.println("  * r i:integer_param=123 f:float_param=123");
// terminal.println("  * r a=200 f=200 f:food_size=0.002");
// terminal.println("");
// terminal.println("---- Funky scenarios ----");
// terminal.println("");
// terminal.println("  * r i:ga_reverse=1 f:sim_speed_min=0.003");
// terminal.println("    (birdies *avoid* food)");
// terminal.println("");
// terminal.println("  * r i:brain_neurons=1");
// terminal.println("    (single-neuroned zombies)");
// terminal.println("");
// terminal.println("  * r f:food_size=0.05");
// terminal.println("    (biiiigie birdies)");
// terminal.println("");
// terminal.println("  * r f:eye_fov_angle=0.45");
// terminal.println("    (narrow field of view)");
// terminal.println("");
// terminal.println("----");
// terminal.scrollToTop();



terminal.onInput((input) => {
    terminal.println("");
    terminal.println("$ " + input);

    try {
        exec(input);
    } catch (err) {
        terminal.println(`  ^ err: ${err}`);
    }
});

function exec(input) {
    if (input.includes("[") || input.includes("]")) {
        throw "square brackets are just for documentation purposes - you don't have to write them, e.g.: reset animals=100";
    }

    const [cmd, ...args] = input.split(" ");

    if (cmd === "p" || cmd === "pause") {
        execPause(args);
        return;
    }

    if (cmd === "r" || cmd === "reset") {
        execReset(args);
        return;
    }

    if (cmd === "t" || cmd === "train") {
        execTrain(args);
        return;
    }

    throw "unknown command";
}

function execPause(args) {
    if (args.length > 0) {
        throw "this command accepts no parameters";
    }

    active = !active;
}

function execReset(args) {
    let config = sim.Simulation.default_config();

    for (const arg of args) {
        const [argName, argValue] = arg.split("=");

        if (argName.startsWith("i:")) {
            config[argName.slice(2)] = parseInt(argValue);
        } else if (argName.startsWith("f:")) {
            config[argName.slice(2)] = parseFloat(argValue);
        } else {
            switch (argName) {
                case "a":
                case "animals":
                    config.world_animals = parseInt(argValue);
                    break;

                case "f":
                case "foods":
                    config.world_foods = parseInt(argValue);
                    break;

                case "n":
                case "neurons":
                    config.brain_neurons = parseInt(argValue);
                    break;

                case "p":
                case "photoreceptors":
                    config.eye_cells = parseInt(argValue);
                    break;

                default:
                    throw `unknown parameter: ${argName}`;
            }
        }
    }

    simulation = new sim.Simulation(config);
}

function execTrain(args) {
    if (args.length > 1) {
        throw "this command accepts at most one parameter";
    }

    const generations = args.length == 0 ? 1 : parseInt(args[0]);

    for (let i = 0; i < generations; i += 1) {
        if (i > 0) {
            terminal.println("");
        }

        const stats = simulation.train();
        terminal.println(stats);

    }
}

function redraw() {
    document.getElementById("generation-num").textContent = generationNum
    if (active) {
        const stats = simulation.step();

        if (stats) {
            generationNum++;
            terminal.println(stats);
         
            // console.log("generation data");
            // console.log(stats)
        }
    }

    const config = simulation.config();
    const world = simulation.world();

    viewport.clear();

    for (const food of world.foods) {
        viewport.drawCircle(
            food.x,
            food.y,
            (config.food_size / 2.0),
            'rgb(0, 255, 128)',
        );
    }

    for (const animal of world.animals) {
        viewport.drawTriangle(
            animal.x,
            animal.y,
            config.food_size,
            animal.rotation,
            'rgb(255, 255, 255)',
        );

        const anglePerCell = config.eye_fov_angle / config.eye_cells;

        for (let cellId = 0; cellId < config.eye_cells; cellId += 1) {
            const angleFrom = (animal.rotation - config.eye_fov_angle / 2.0) + (cellId * anglePerCell);
            const angleTo = angleFrom + anglePerCell;
            const energy = animal.vision[cellId];

            viewport.drawArc(
                animal.x,
                animal.y,
                (config.food_size * 2.5),
                angleFrom,
                angleTo,
                `rgba(0, 255, 128, ${energy})`,
            );
        }
    }

    requestAnimationFrame(redraw);
}

redraw();
