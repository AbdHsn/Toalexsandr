using DataLayer.Models.EntityModels;
using DataLayer.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using GlobalModel = DataLayer.Models.GlobalModels;




namespace RepositoryLayer
{
    public class EntityContext : DbContext
    {
        public EntityContext(DbContextOptions<EntityContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<GetAuthorizedRoleView>(a =>
            {
                a.ToView("GetAuthorizedRoleView");
                a.HasNoKey();
            });

            modelBuilder.Entity<GlobalModel.TotalRecordCountGLB>().HasNoKey();

            //builder.Entity<ReferralBonusViewEntity>(a =>
            //{
            //    a.ToView("getAllReferralBonusView");
            //});

            //builder.Entity<DashboardSPEntity>(a =>
            //{
            //    a.HasNoKey();
            //});

            //builder.Entity<MapSpEntity>(a =>
            //{
            //    a.HasNoKey();
            //});
        }
        #region TableEntity
        public DbSet<AuthorizedRole> AuthorizedRole { get; set; }

        public DbSet<Brand> Brand { get; set; }

        public DbSet<Category> Category { get; set; }

        public DbSet<Company> Company { get; set; }

        public DbSet<ContactLensDetail> ContactLensDetail { get; set; }

        public DbSet<ContactLenseRX> ContactLenseRX { get; set; }

        public DbSet<Discount> Discount { get; set; }

        public DbSet<Document> Document { get; set; }

        public DbSet<FrameDetail> FrameDetail { get; set; }

        public DbSet<Gateway> Gateway { get; set; }

        public DbSet<HealthProfile> HealthProfile { get; set; }

        public DbSet<MessageScheduler> MessageScheduler { get; set; }

        public DbSet<Order> Order { get; set; }

        public DbSet<OrderDetail> OrderDetail { get; set; }

        public DbSet<OrderExchange> OrderExchange { get; set; }

        public DbSet<OrderReturn> OrderReturn { get; set; }

        public DbSet<OrderReturnDetail> OrderReturnDetail { get; set; }

        public DbSet<ProductSKU> ProductSKU { get; set; }

        public DbSet<ProductType> ProductType { get; set; }

        public DbSet<Purchase> Purchase { get; set; }

        public DbSet<PurchaseDetail> PurchaseDetail { get; set; }

        public DbSet<PurchaseReturn> PurchaseReturn { get; set; }

        public DbSet<PurchaseReturnDetail> PurchaseReturnDetail { get; set; }

        public DbSet<ReadyProduct> ReadyProduct { get; set; }

        public DbSet<Role> Role { get; set; }

        public DbSet<SpectacleRX> SpectacleRX { get; set; }

        public DbSet<StockTrace> StockTrace { get; set; }

        public DbSet<SunglassDetail> SunglassDetail { get; set; }

        public DbSet<Transaction> Transaction { get; set; }

        public DbSet<User> User { get; set; }

        public DbSet<UserType> UserType { get; set; }

        public DbSet<Vat> Vat { get; set; }
        #endregion TableEntity

        #region ViewEntity
        public DbSet<GetAuthorizedRoleView> GetAuthorizedRoleView { get; set; }
        #endregion ViewEntity

        #region SPEntity
        #endregion SPEntity

        #region  RawSQL Entity
        public DbSet<GlobalModel.TotalRecordCountGLB> TotalRecordCountGLB { get; set; }
        #endregion RawSQL Entity
    }

}
