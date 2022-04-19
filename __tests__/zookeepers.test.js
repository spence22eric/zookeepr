const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeepers,
    validateZookeepers,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");
jest.mock('fs');

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Eric", id: "apoe1wih22aop" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Eric");
    expect(zookeeper.id).toBe("apoe1wih22aop");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "6",
            name: "Amiko",
            age: 43,
            favoriteAnimal: "Quokkas"
        },
        {
            id: "7",
            name: "Emmy",
            age: 29,
            favoriteAnimal: "Duckbilled Platypus"
        },
    ];

    const updatedZookeepers = filterByQuery({ age: 29 }, startingZookeepers);
    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "6",
            name: "Amiko",
            age: 43,
            favoriteAnimal: "Quokkas"
        },
        {
            id: "7",
            name: "Emmy",
            age: 29,
            favoriteAnimal: "Duckbilled Platypus"
        },
    ];

    const result = findById("6", startingZookeepers);
    expect(result.name).toBe("Amiko");
});

test("validates age", () => {
    const zookeeper = {
        id: "2",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin",
    };

    const invalidZookeeper = {
        id: "3",
        name: "Isabella",
        age: "67",
        favoriteAnimal: "bear",
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});