export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export enum LinkType {
	OTHER = "Other",
	URL = "URL",
	PHONE = "Phone",
	EMAIL = "Email",
}

export interface C_primaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export interface C_secondaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export default interface Ce_service {
	landingPageUrl?: string,
	primaryPhoto?: ComplexImage,
	richTextDescription?: string,
	name: string,
	c_primaryCTA?: C_primaryCTA,
	c_relatedFAQs?: EntityReference[],
	c_richtextDescription?: any,
	c_secondaryCTA?: C_secondaryCTA,
	photoGallery?: ComplexImage[],
	id: string,
}
