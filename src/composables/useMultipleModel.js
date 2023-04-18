export function useMultipleModel(array, value, checked) {
    if (checked) {
        array.push(value)
    } else {
        return array.filter(elem => elem !== value)
    }
}