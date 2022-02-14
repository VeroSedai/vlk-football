const {atom} = require("recoil");

export const selectedPlayerState = atom({
    key: "selectedPlayerState",
    default: []
});

export const unSelectedPlayerState = atom({
    key: "unSelectedPlayerState",
    default: []
});

export const isSelectablePlayerLimitReached = atom({
    key: "isSelectablePlayerLimitReached",
    default: false
});

export const allPlayerState = atom({
    key: "allPlayerState",
    default: []
});

export const firstTeamState = atom({
    key: "firstTeamState",
    default: []
});

export const secondTeamState = atom({
    key: "secondTeamState",
    default: []
});

export const matchDateAndPlace = atom({
    key: "matchDateAndPlace",
    default: []
});