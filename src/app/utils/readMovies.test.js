

const path = require('path');
const { readMoviesFromCSV } = require('./readMoviesFromCSV');
const e = require('express');
const fs = require('fs');

describe('readMoviesFromCSV', () => {
    it('should read movies from CSV file', async () => {
        const filePath = '../../../movielist.csv';
        const movies  = await readMoviesFromCSV(filePath);
        expect(Array.isArray(movies)).toBe(true);
    });
    it('should match the data in the CSV file', async () => {
        const filePath = '../../../movielist.csv';
        const expected = [
             {
                year: 1980,
                title: "Can't Stop the Music",
                studios: 'Associated Film Distribution',
                producers: 'Allan Carr',
                winner: true,
            },
            {
                year: 1980,
                title: 'Cruising',
                studios: 'Lorimar Productions, United Artists',
                producers: 'Jerry Weintraub',
                winner: false
            }
        ];
      
        const result = await readMoviesFromCSV(filePath);
        
        expect(result[0, 1]).toEqual(expected[0, 1]);
    });
});