import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import type axe from "axe-core";

interface Ia11yViolation {
	description: string;
	impact: string;
	instances: Ia11yViolationInstance[];
	tags: string[];
}

interface Ia11yViolationInstance {
	impact: string;
	failureSummary: string;
	target: string[];
	html: string;
}

export class A11yViolation implements Ia11yViolation {
	description: string;
	impact: string;
	tags: string[];
	instances: Ia11yViolationInstance[];

	constructor(result: axe.Result) {
		this.description = result.description;
		this.impact = result.impact ?? "";
		this.tags = result.tags;
		this.instances = result.nodes.map(
			(node) =>
				({
					failureSummary: node.failureSummary,
					html: node.html,
					target: node.target,
					impact: node.impact,
				}) as Ia11yViolationInstance,
		);
	}

	static async getAll(page: Page): Promise<A11yViolation[]> {
		const accessibilityScanner = new AxeBuilder({
			page,
		}).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]);

		const results = await accessibilityScanner.analyze();
		return results.violations.map((violation) => new A11yViolation(violation));
	}
}
