import { TabsContent } from "@/components/ui/tabs";
import AgentDetails from "./AgentDetails";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ITask } from "@/model/task";
import { AgentDocument } from "@/model/agent";
import { AgentSkillDocument } from "@/lib/hook/useSkill";

export default function DetailsTab({
    selectedAgent,
    activeSkillsLoading,
    activeSkillIds,
    skills,
    tasks
}: {
    selectedAgent: AgentDocument;
    activeSkillsLoading: boolean;
    activeSkillIds: NoInfer<string[]>;
    skills: NoInfer<AgentSkillDocument[]> | undefined;
    tasks: NoInfer<ITask[]> | undefined
}) {
    return (
        <TabsContent value="details" className="mt-6">
            <AgentDetails agent={selectedAgent} />

            <Separator className="my-6" />

            {/* Active Skills Summary */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">Active Skills</h3>
                {activeSkillsLoading ? (
                    <p className="text-sm text-neutral-500">Loading active skills...</p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {activeSkillIds.length === 0 ? (
                            <Badge variant="outline" className="text-xs text-neutral-500 border-neutral-300 dark:border-neutral-600">
                                No active skills
                            </Badge>
                        ) : (
                            activeSkillIds.map((skillName: string) => {
                                const skill = skills?.find((s) => s.name === skillName);
                                return (
                                    <Badge key={skillName} variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
                                        {skill?.icon ? `${skill.icon} ` : ""}{skillName}
                                    </Badge>
                                );
                            })
                        )}
                    </div>
                )}

                {/* Agent Tasks */}
                <h4 className="text-md font-semibold text-neutral-700 dark:text-neutral-300 mt-6">Related Tasks</h4>
                {tasks && tasks.length > 0 ? (
                    <div className="space-y-2">
                        {tasks.slice(0, 5).map((task: ITask) => (
                            <div key={task._id?.toString()} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{task.title}</span>
                                <Badge variant="outline" className={`text-xs ${task.status === "completed" ? "bg-green-50 text-green-700 border-green-200" :
                                    task.status === "running" || task.status === "retrying" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                        task.status === "failed" ? "bg-red-50 text-red-700 border-red-200" :
                                            task.status === "cancelled" ? "bg-gray-50 text-gray-700 border-gray-200" :
                                                "bg-yellow-50 text-yellow-700 border-yellow-200"
                                    }`}>
                                    {task.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-neutral-500">No tasks found for this agent.</p>
                )}
            </div>
        </TabsContent>
    )
}