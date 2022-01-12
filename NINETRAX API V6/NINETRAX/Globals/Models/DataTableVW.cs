namespace NINETRAX.Globals.Models
{
        public class DataTableVW
        {
            public int draw { get; set; }
            public int start { get; set; }
            public object length { get; set; }
            public Search search { get; set; }
            public List<Column> columns { get; set; }
            public List<Search> searches { get; set; }
            public List<Order> order { get; set; }
        }

        public class Search
        {
            public string value { get; set; }
            public string search_by { get; set; }

            public string fromdate { get; set; }
            public string todate { get; set; }

            public bool regex { get; set; }
        }

        public class Column
        {
            public string data { get; set; }
            public string name { get; set; }
            public bool searchable { get; set; }
            public bool orderable { get; set; }
            public Search search { get; set; }
        }

        public class Order
        {
            public int column { get; set; }
            public string dir { get; set; }
        }

        public class search_by
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }

}
