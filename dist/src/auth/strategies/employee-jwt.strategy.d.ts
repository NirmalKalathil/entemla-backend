import { Strategy } from "passport-jwt";
declare const EmployeeJwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class EmployeeJwtStrategy extends EmployeeJwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        id: any;
        role: any;
        constituencyId: any;
        employeeId: any;
        mlaId: any;
    }>;
}
export {};
