export interface SchemaDto{
    schema:Array<Schema>
}
export interface Schema{
    moduleName: string
    commands: Array<Command>
    events: Array<IEvent>
    sagas: Array<Saga>
    queries: Array<Query>
}

interface Command{
    name: string
    props: Map<string,string>
    dispatches: Array<number>
}

interface IEvent{
    name: string
    props: Map<string,string>
    dispatches: Array<number>
}

interface Saga{
    name: string
    props: Map<string,string>
    dispatches: Array<number>
}

interface Query{
    name: string
    props: Map<string,string>
    returns: string
}
