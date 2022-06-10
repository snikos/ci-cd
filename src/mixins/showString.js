export const showString = {
    // props: {
    //     string: String,
    // },
    methods: {
        showMix(str) {
            const test = str.split(',');
            let mark = '';
            return test.map((el, index, array) => {
                (index < array.length - 1) ? mark = ' -> ' : mark = '';
                let word = el.substr(0,1).toUpperCase() + el.substr(1, el.length) + mark;
                return word;
            })
        },
    }
}