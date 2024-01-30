type PaginationTotalProps = {
  total: number;
  entityName: string;
};

export function PaginationTotal({ total, entityName }: PaginationTotalProps) {
  return (
    <span
      style={{
        marginLeft: "16px",
      }}
    >
      <span className="ant-text secondary">{total}</span> {entityName} in total
    </span>
  );
}
