class User {
    skills: string[];
    addSkill(skill: string): void;
    addSkill(skills: string[]): void;
    addSkill(skillorSkills: string | string[]): void {
        if (typeof skillorSkills === "string") {
            this.skills.push(skillorSkills);
        } else if (Array.isArray(skillorSkills)) {
            this.skills.push(...skillorSkills);
        }
    }

}