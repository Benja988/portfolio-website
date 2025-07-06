import { Skill } from '../types';

interface Props {
  skill: Skill;
}

export default function SkillCard({ skill }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition">
      <h3 className="text-xl font-semibold">{skill.name}</h3>
      <p className="text-gray-600 mt-2">{skill.category}</p>
    </div>
  );
}