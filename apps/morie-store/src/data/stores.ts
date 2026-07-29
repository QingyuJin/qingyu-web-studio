export type Store = {
  city: "台北" | "台中" | "高雄";
  name: string;
  address: string;
  hours: string;
  phone: string;
  coordinates: { top: string; left: string };
};

export const stores: Store[] = [
  { city: "台北", name: "MORIÉ 青田所", address: "台北市大安區青田街 7 巷 12 號", hours: "每日 11:00—20:00", phone: "02 2396 0712", coordinates: { top: "25%", left: "66%" } },
  { city: "台中", name: "MORIÉ 柳川所", address: "台中市西區民生北路 38 號", hours: "週二至週日 11:00—19:30", phone: "04 2301 1838", coordinates: { top: "51%", left: "49%" } },
  { city: "高雄", name: "MORIÉ 鹽埕所", address: "高雄市鹽埕區新樂街 41 號", hours: "每日 12:00—20:00", phone: "07 521 3041", coordinates: { top: "76%", left: "39%" } },
];
