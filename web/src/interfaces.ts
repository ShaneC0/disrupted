
interface IValidationError {
    target: object,
    property: string,
    value: any,
    constraints: {
        [key: string]: string;
    }
}

export default IValidationError