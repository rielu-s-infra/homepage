// src/lib/status.ts

export interface ServiceStatus {
  name: string;
  status: 'Operational' | 'Down' | 'Pending';
  color: string;
}

export async function getKumaStatus(slug: string): Promise<ServiceStatus[]> {
  try {
    const response = await fetch(`/api-kuma/api/status-page/${slug}`);
    const data = await response.json();

    if (!data.publicGroupList) return [];

    return data.publicGroupList.flatMap((group: any) =>
      group.monitorList.map((monitor: any) => {
        // monitor.status が無い場合は、一旦 Operational と仮定するか、
        // ログを確認して正しいステータスフィールド(activeなど)を探す
        const isUp = monitor.status === 1 || monitor.status === undefined; 

        return {
          name: monitor.name,
          status: isUp ? 'Operational' : 'Down',
          color: isUp ? 'text-green-400' : 'text-red-400'
        };
      })
    );
  } catch (error) {
    console.error("Status fetch failed:", error);
    return [];
  }
}