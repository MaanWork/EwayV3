export class Policy {
	ref: any = null
	ts: number = 0
	data: PolicyData = null

	constructor(data) {
		this.ref = data.ref
		this.ts = data.ts
		const policy = { ...data.data }
		policy.id = data.ref['@ref'].id
		this.data = new PolicyData(policy)
	}
}
export class PolicyData {
    plantMachinery:any;ConstructionType:any;
    constructor(data?){
        this.plantMachinery = data?.plantMachinery ?? '';
		this.ConstructionType = data?.ConstructionType ?? '';
    }
}