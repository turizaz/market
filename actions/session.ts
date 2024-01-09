import {getServerSession, Session as SessionNextAuth} from "next-auth";
import {authOptions} from "@/libs/auth";

export function getSession() {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	return getServerSession(authOptions) as SessionNextAuth;
}