import { AreaGraph } from '@/features/overview/components/area-graph';

export default async function Sales() {
  return <AreaGraph chartType="workflowRoi" />;
}
