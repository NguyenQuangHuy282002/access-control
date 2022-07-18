import rand from "../lib/rand";

export namespace RegionNS {
  export interface Region {
    id: string;
    type: RegionType;
    parent_id: string;
    name: string;
    ctime: number;
    mtime: number;
  }

  export enum RegionType {
    PROVINCE = "province",
    DISTRICT = "district",
    WARD = "ward",
  }

  export interface RegionQuery {
    type: RegionType;
    parent_id: string;
  }

  export interface BLL {
    ListRegion(query: RegionNS.RegionQuery): Promise<RegionNS.Region[]>;
    GetRegion(name: string): Promise<RegionNS.Region[]>;
  }

  export interface DAL {
    ListRegion(query: RegionNS.RegionQuery): Promise<RegionNS.Region[]>;
    GetRegion(name: string): Promise<RegionNS.Region[]>;
  }

  export const Errors = {
    RegionNotFound: new Error("Region not found"),
  };

  export const Ultis = {
    SortAble: (array: RegionNS.Region[]) => {
      const HN = array.find((r) => r.name === "Thành phố Hà Nội");
      const TPHCM = array.find((r) => r.name === "Thành phố Hồ Chí Minh");
      const res = array.filter(
        (r) => !["Thành phố Hà Nội", "Thành phố Hồ Chí Minh"].includes(r.name)
      );
      return [HN, TPHCM, ...res.sort((a, b) => a.name.localeCompare(b.name))];
    },
  };
}
