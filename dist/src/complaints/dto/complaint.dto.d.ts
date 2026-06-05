export declare enum UrgencyLevel {
    NORMAL = "Normal",
    MEDIUM = "Medium",
    URGENT = "Urgent"
}
export declare enum VisibilityType {
    PUBLIC = "Public",
    PRIVATE = "Private"
}
export declare class CreateComplaintDto {
    title: string;
    category: string;
    urgency: UrgencyLevel;
    details: string;
    visibility?: VisibilityType;
    location?: string;
    evidence?: string;
    citizenId: string;
    rejectionReason?: string;
    rejectedBy?: {
        adminId: string;
        adminName: string;
        adminRole: string;
        mlaId?: string;
    };
}
