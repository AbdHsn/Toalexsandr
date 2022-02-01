using DataLayer.Models.EntityModels;
using DataLayer.Models.GlobalModels;
using DataLayer.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace RepositoryLayer
{
    public partial class EntityContext : DbContext
    {
        public EntityContext()
        {
        }

        public EntityContext(DbContextOptions<EntityContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //For none primary key
            //modelBuilder.Entity<DriversSettlementSpEntity>(entity =>
            //{
            //    entity.HasNoKey();
            //});

            modelBuilder.Entity<ATbNasinspectionsView>(entity =>
            {
                entity.HasNoKey();
            });


            modelBuilder.Entity<TbDirectoryNamesView>(entity =>
            {
                entity.HasNoKey();
            });


            modelBuilder.Entity<TotalRecordCountGLB>(entity =>
            {
                entity.HasNoKey();
            });

            modelBuilder.Entity<ATbElinNumber>(entity =>
            {
                entity.ToTable("A_tb_ElinNumber");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Annex)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(800)
                    .IsUnicode(false);

                entity.Property(e => e.Elin)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("ELIN");

                entity.Property(e => e.PrimPm)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PrimPM");

                entity.Property(e => e.ProjectNo)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SecPm)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SecPM");

                entity.Property(e => e.Site)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Spec)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SubType)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.WorkType)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ATbImage>(entity =>
            {
                entity.ToTable("A_tb_images");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.BookName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FileExt)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("File_Ext");

                entity.Property(e => e.FileName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("File_Name");

                entity.Property(e => e.Image)
                    .HasMaxLength(1)
                    .HasColumnName("image")
                    .IsFixedLength();
            });

            modelBuilder.Entity<ATbNasbmdannexTable>(entity =>
            {
                entity.ToTable("A_tb_NASBMDAnnexTable");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Annex)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.AnnexName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Site)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SpecItem)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ATbNasinspection>(entity =>
            {
                entity.ToTable("A_tb_NASInspections");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.ActualFinish)
                    .HasColumnType("date")
                    .HasColumnName("Actual Finish");

                entity.Property(e => e.ActualStart)
                    .HasColumnType("date")
                    .HasColumnName("Actual Start");

                entity.Property(e => e.Annex)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Asset)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CauseCode)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Cause Code");

                entity.Property(e => e.CorrectiveActions)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Corrective Actions");

                entity.Property(e => e.Crew)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DeletedBy)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("deletedBy");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Elin)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EnteredDate)
                    .HasColumnType("date")
                    .HasColumnName("Entered Date");

                entity.Property(e => e.GlAccount)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("GL Account");

                entity.Property(e => e.InspectionDate)
                    .HasColumnType("date")
                    .HasColumnName("Inspection Date");

                entity.Property(e => e.InspectionResults)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Inspection Results");

                entity.Property(e => e.Lead)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Location)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Priority)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.QcInspector)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("QC Inspector");

                entity.Property(e => e.Qccomments)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("QCComments");

                entity.Property(e => e.ReinspectionDate)
                    .HasColumnType("date")
                    .HasColumnName("Reinspection Date");

                entity.Property(e => e.ReinspectionStatus)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Reinspection Status");

                entity.Property(e => e.RootCause)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Root Cause");

                entity.Property(e => e.SpecItem)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Spec_Item");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.StatusDate)
                    .HasColumnType("date")
                    .HasColumnName("Status Date");

                entity.Property(e => e.SubWorkType)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Sub Work Type");

                entity.Property(e => e.TargetFinish)
                    .HasColumnType("date")
                    .HasColumnName("Target Finish");

                entity.Property(e => e.TargetStart)
                    .HasColumnType("date")
                    .HasColumnName("Target Start");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UnsatFindings)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Unsat Findings");

                entity.Property(e => e.WorkOrder)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Work Order");

                entity.Property(e => e.WorkType)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Work Type");
            });

            modelBuilder.Entity<ATbNasinspectionsArchive>(entity =>
            {
                entity.ToTable("A_tb_NASInspections_Archive");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.ActualFinish)
                    .HasColumnType("datetime")
                    .HasColumnName("Actual Finish");

                entity.Property(e => e.ActualStart)
                    .HasColumnType("datetime")
                    .HasColumnName("Actual Start");

                entity.Property(e => e.Annex)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Asset)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CauseCode)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Cause Code");

                entity.Property(e => e.CorrectiveActions)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Corrective Actions");

                entity.Property(e => e.Crew)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Elin)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EnteredDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Entered Date");

                entity.Property(e => e.GlAccount)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("GL Account");

                entity.Property(e => e.InspectionDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Inspection Date");

                entity.Property(e => e.InspectionResults)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Inspection Results");

                entity.Property(e => e.Lead)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Location)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Priority)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.QcInspector)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("QC Inspector");

                entity.Property(e => e.Qccomments)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("QCComments");

                entity.Property(e => e.ReinspectionDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Reinspection Date");

                entity.Property(e => e.ReinspectionStatus)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Reinspection Status");

                entity.Property(e => e.RootCause)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Root Cause");

                entity.Property(e => e.SearchField)
                    .HasMaxLength(243)
                    .IsUnicode(false);

                entity.Property(e => e.SpecItem)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Spec_Item");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.StatusDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Status Date");

                entity.Property(e => e.SubWorkType)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Sub Work Type");

                entity.Property(e => e.TargetFinish)
                    .HasColumnType("datetime")
                    .HasColumnName("Target Finish");

                entity.Property(e => e.TargetStart)
                    .HasColumnType("datetime")
                    .HasColumnName("Target Start");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UnsatFindings)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Unsat Findings");

                entity.Property(e => e.WorkOrder)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Work Order");

                entity.Property(e => e.WorkType)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Work Type");
            });

            modelBuilder.Entity<ATbNasinspectionsImport>(entity =>
            {
                entity.ToTable("A_tb_NASInspectionsImport");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                entity.Property(e => e.OnBehalfOf)
                    .HasMaxLength(255)
                    .HasColumnName("On Behalf Of");
                
                entity.Property(e => e.ActualFinish)
                    .HasColumnType("datetime")
                    .HasColumnName("Actual Finish");

                entity.Property(e => e.ActualStart)
                    .HasColumnType("datetime")
                    .HasColumnName("Actual Start");

                entity.Property(e => e.Asset)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Crew)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Elin)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                //entity.Property(e => e.GlAccount)
                //    .HasMaxLength(255)
                //    .IsUnicode(false)
                //    .HasColumnName("GL Account");

                entity.Property(e => e.Lead)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Location)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                //entity.Property(e => e.Priority)
                //    .HasMaxLength(255)
                //    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.StatusDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Status Date");

                entity.Property(e => e.SubWorkType)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Sub Work Type");

                entity.Property(e => e.TargetFinish)
                    .HasColumnType("datetime")
                    .HasColumnName("Target Finish");

                entity.Property(e => e.TargetStart)
                    .HasColumnType("datetime")
                    .HasColumnName("Target Start");

                entity.Property(e => e.WorkOrder)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Work Order");

                entity.Property(e => e.WorkType)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Work Type");
            });

            modelBuilder.Entity<ATbPdrtracker>(entity =>
            {
                entity.ToTable("A_tb_PDRTracker");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Annex)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("ANNEX");

                entity.Property(e => e.CauseCode)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Cause Code");

                entity.Property(e => e.ClosedBy)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("CLOSED BY");

                entity.Property(e => e.DateClosed)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE CLOSED");

                entity.Property(e => e.DateCompleted)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE COMPLETED");

                entity.Property(e => e.DateDue)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE DUE");

                entity.Property(e => e.DateIssued)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE ISSUED");

                entity.Property(e => e.DateReinspected)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE REINSPECTED");

                entity.Property(e => e.DateStarted)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE STARTED");

                entity.Property(e => e.DescriptionOfInspection)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("DESCRIPTION OF INSPECTION");

                entity.Property(e => e.FmResponse)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("FM RESPONSE");

                entity.Property(e => e.Fmname)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("FMNAME");

                entity.Property(e => e.Fmtitle)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("FMTITLE");

                entity.Property(e => e.InspectionFailReason)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("INSPECTION FAIL REASON");

                entity.Property(e => e.Location)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Pdrnumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PDRNUmber");

                entity.Property(e => e.QcComments)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("QC COMMENTS");

                entity.Property(e => e.QcComments2)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("QC COMMENTS2");

                entity.Property(e => e.QcInspector)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("QC Inspector");

                entity.Property(e => e.RootCause)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Root Cause");

                entity.Property(e => e.SpecItem)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SPEC ITEM");

                entity.Property(e => e.SpecItemRequirements)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("SPEC ITEM REQUIREMENTS");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("STATUS");

                entity.Property(e => e.SubcontractorName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SUBCONTRACTOR NAME");

                entity.Property(e => e.SurveillanceResults)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SURVEILLANCE RESULTS");

                entity.Property(e => e.SurveillanceType)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SURVEILLANCE TYPE");

                entity.Property(e => e.TechsName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Techs_Name");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("TITLE");

                entity.Property(e => e.UnsatFindings)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("Unsat Findings");

                entity.Property(e => e.WorkOrder)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Work Order");
            });

            modelBuilder.Entity<ATbYear>(entity =>
            {
                entity.ToTable("A_tb_Years");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.StatYear).HasColumnName("Stat_Year");
            });

            modelBuilder.Entity<TbCcrtracker>(entity =>
            {
                entity.ToTable("tb_CCRTracker");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Annex)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CcrNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("CCR NUMBER");

                entity.Property(e => e.CcrResponse)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("CCR RESPONSE");

                entity.Property(e => e.Comments)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("COMMENTS");

                entity.Property(e => e.DateAcked)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE ACKED");

                entity.Property(e => e.DateClosed)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE CLOSED");

                entity.Property(e => e.DateReceived)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE RECEIVED");

                entity.Property(e => e.DateResponded)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE RESPONDED");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("DESCRIPTION");

                entity.Property(e => e.DetailOfComplaint)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("DETAIL OF COMPLAINT");

                entity.Property(e => e.DetailOfComplaintShort)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("DETAIL OF COMPLAINT SHORT");

                entity.Property(e => e.FmBldgManager)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("FM_BLDG_MANAGER");

                entity.Property(e => e.Isitvalid)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("ISITVALID");

                entity.Property(e => e.IssuedBy)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("ISSUED BY");

                entity.Property(e => e.Location)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("LOCATION");

                entity.Property(e => e.Par)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PAR");

                entity.Property(e => e.ResponseBy)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("RESPONSE BY");

                entity.Property(e => e.Site)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SITE");

                entity.Property(e => e.SpecItem1)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SPEC ITEM 1");

                entity.Property(e => e.SpecItem3)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SPEC ITEM 3");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("STATUS");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("TITLE");

                entity.Property(e => e.UnsatCondition)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("UNSAT Condition");

                entity.Property(e => e.UnsatRootCause)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("UNSAT ROOT CAUSE");

                entity.Property(e => e.Valid)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("VALID");

                entity.Property(e => e.WoNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("WO NUMBER");
            });

            modelBuilder.Entity<TbCdrtracker>(entity =>
            {
                entity.ToTable("tb_CDRTracker");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Cdrnumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("cdrnumber");

                entity.Property(e => e.Considerations)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("considerations");

                entity.Property(e => e.Dateclosed)
                    .HasColumnType("datetime")
                    .HasColumnName("dateclosed");

                entity.Property(e => e.Datereceived)
                    .HasColumnType("datetime")
                    .HasColumnName("datereceived");

                entity.Property(e => e.Discrepancy)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("discrepancy");

                entity.Property(e => e.Discrepancyshort)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("discrepancyshort");

                entity.Property(e => e.Functionalmanager)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("functionalmanager");

                entity.Property(e => e.Isitvalid)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("isitvalid");

                entity.Property(e => e.Memonumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("memonumber");

                entity.Property(e => e.Notes)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("notes");

                entity.Property(e => e.Response)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("response");

                entity.Property(e => e.Responsedate)
                    .HasColumnType("datetime")
                    .HasColumnName("responsedate");

                entity.Property(e => e.Responseduedate)
                    .HasColumnType("datetime")
                    .HasColumnName("responseduedate");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("status");
            });

            modelBuilder.Entity<TbDbrevision>(entity =>
            {
                entity.ToTable("tb_DBRevisions");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.DateIssued)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Date Issued");

                entity.Property(e => e.Memo)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ReleaseDate)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ReleasedBy)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Version)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbDbsetting>(entity =>
            {
                entity.ToTable("tb_DBSettings");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.AutofillFormsFolder)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbDirectoryName>(entity =>
            {
                entity.ToTable("tb_DirectoryNames");

                //entity.HasKey();

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                //entity.Property(e => e.BaseOfOperation)
                //    .HasMaxLength(255)
                //    .IsUnicode(false);

                //entity.Property(e => e.PersonName)
                //    .HasMaxLength(255)
                //    .IsUnicode(false);

                //entity.Property(e => e.PersonTitle)
                //    .HasMaxLength(255)
                //    .IsUnicode(false);
            });


            modelBuilder.Entity<TbDropDownMenu>(entity =>
            {
                entity.ToTable("tb_DropDownMenu");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.CauseCode)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CcrstatusMenu)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("CCRStatusMenu");

                entity.Property(e => e.CorrectiveAction)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Estimators)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("ESTIMATORS");

                entity.Property(e => e.FmBldgManager)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("FM_BLDG_MANAGER");

                entity.Property(e => e.JaxPar)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("JAX_PAR");

                entity.Property(e => e.MptAsgnCode)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MPT_ASGN_Code");

                entity.Property(e => e.MptPar)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MPT_PAR");

                entity.Property(e => e.PawAssessment)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PAW ASSESSMENT");

                entity.Property(e => e.Pawrating)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PAWRating");

                entity.Property(e => e.PawrootCause)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PAWRootCause");

                entity.Property(e => e.PawstatusMenu)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PAWStatusMenu");

                entity.Property(e => e.Pawunsat)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PAWUnsat");

                entity.Property(e => e.PdrstatusMenu)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PDRStatusMenu");

                entity.Property(e => e.Qcstatus)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("QCStatus");

                entity.Property(e => e.Qctechs)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("QCTechs");

                entity.Property(e => e.RootCause)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Validity)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbIdiqtracker>(entity =>
            {
                entity.ToTable("tb_IDIQTracker");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.ActualCompletionDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Actual Completion Date");

                entity.Property(e => e.ApprovedEndDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Approved End Date");

                entity.Property(e => e.ApprovedStartDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Approved Start Date");

                entity.Property(e => e.CauseCode)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ClosedBy)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("CLOSED BY");

                entity.Property(e => e.Comments)
                    .HasMaxLength(800)
                    .IsUnicode(false);

                entity.Property(e => e.DateReceivedFromPar)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE RECEIVED FROM PAR");

                entity.Property(e => e.DateSentToPar)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE SENT TO PAR");

                entity.Property(e => e.DateSentToWorkControl)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE SENT TO WORK CONTROL");

                entity.Property(e => e.DateWoWasClosed)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE WO WAS CLOSED");

                entity.Property(e => e.Estimator)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.IdiqWorkOrderDescription)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("IDIQ Work Order Description");

                entity.Property(e => e.ModNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MOD NUMBER");

                entity.Property(e => e.ParAssigned)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PAR ASSIGNED");

                entity.Property(e => e.QcInspectionComplete)
                    .HasColumnType("datetime")
                    .HasColumnName("QC Inspection Complete");

                entity.Property(e => e.QcReceivedDate)
                    .HasColumnType("datetime")
                    .HasColumnName("QC RECEIVED DATE");

                entity.Property(e => e.RootCause)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SubcontractorInHouse)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Subcontractor / In House");

                entity.Property(e => e.SubcontractorName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Subcontractor Name");

                entity.Property(e => e.TaskCompleted)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("Task Completed");

                entity.Property(e => e.TaskCompletedOnTime)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("TASK COMPLETED ON TIME");

                entity.Property(e => e.UnsatNotes)
                    .HasMaxLength(800)
                    .IsUnicode(false);

                entity.Property(e => e.VerifiedBy)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("VERIFIED BY");

                entity.Property(e => e.WoCompleted)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("WO COMPLETED");

                entity.Property(e => e.WoLocation)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("WO Location");

                entity.Property(e => e.WoNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("WO Number");

                entity.Property(e => e.WoStatus)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("WO Status");

                entity.Property(e => e.WoType)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("WO Type");
            });

            modelBuilder.Entity<TbLogInTime>(entity =>
            {
                entity.ToTable("tb_LogInTime");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.LogId).HasColumnName("LogID");

                entity.Property(e => e.LogOutTime).HasColumnType("datetime");

                entity.Property(e => e.LoginTime).HasColumnType("datetime");

                entity.Property(e => e.UserId)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("UserID");
            });

            modelBuilder.Entity<TbLoginSecurityQ>(entity =>
            {
                entity.ToTable("tb_LoginSecurityQ");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.SecurityQuestions)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMenuCustomerCcrstatus>(entity =>
            {
                entity.ToTable("tb_Menu_CustomerCCRStatus");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMenuCustomerFmbldgManager>(entity =>
            {
                entity.ToTable("tb_Menu_CustomerFMBldgManagers");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Aor)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("AOR");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMenuCustomerPawassessment>(entity =>
            {
                entity.ToTable("tb_Menu_CustomerPAWAssessment");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMenuCustomerPawlevel>(entity =>
            {
                entity.ToTable("tb_Menu_CustomerPAWLevel");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMenuCustomerPawstatus>(entity =>
            {
                entity.ToTable("tb_Menu_CustomerPAWStatus");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMenuIdiqWotype>(entity =>
            {
                entity.ToTable("tb_Menu_IDIQ_WOType");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Active)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("active");

                entity.Property(e => e.WoType)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("wo_type");
            });

            modelBuilder.Entity<TbMenuInspectionCauseCode>(entity =>
            {
                entity.ToTable("tb_Menu_InspectionCauseCode");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Seq)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .HasColumnName("seq");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMenuInspectionCauseCorrectiveAction>(entity =>
            {
                entity.ToTable("tb_Menu_InspectionCauseCorrectiveAction");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMenuInspectionCauseRoot>(entity =>
            {
                entity.ToTable("tb_Menu_InspectionCauseRoot");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMenuInspectionPdrstatus>(entity =>
            {
                entity.ToTable("tb_Menu_InspectionPDRStatus");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMenuInspectionStatus>(entity =>
            {
                entity.ToTable("tb_Menu_InspectionStatus");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMenuInspectionSurvResult>(entity =>
            {
                entity.ToTable("tb_Menu_InspectionSurvResults");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMenuInspectionType>(entity =>
            {
                entity.ToTable("tb_Menu_InspectionType");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("status");
            });

            modelBuilder.Entity<TbMenuNamingConvention>(entity =>
            {
                entity.ToTable("tb_Menu_NamingConvention");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.AbrvName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("abrv_name");

                entity.Property(e => e.Active)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("active");

                entity.Property(e => e.Group)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("group");

                entity.Property(e => e.LastUsedConv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("last_used_conv");

                entity.Property(e => e.NamingConv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("naming_conv");

                entity.Property(e => e.NextToUseConv)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("next_to_use_conv");

                entity.Property(e => e.NumberSeq).HasColumnName("number_seq");

                entity.Property(e => e.Postfix)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("postfix");

                entity.Property(e => e.Prefix)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("prefix");

                entity.Property(e => e.TrackerName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("tracker_name");
            });

            modelBuilder.Entity<TbMenuValidStatus>(entity =>
            {
                entity.ToTable("tb_Menu_ValidStatus");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbMonthDate>(entity =>
            {
                entity.ToTable("tb_MonthDates");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.MonthId).HasColumnName("MonthID");

                entity.Property(e => e.MonthName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbNcrtracker>(entity =>
            {
                entity.ToTable("tb_NCRTracker");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Annex)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("ANNEX");

                entity.Property(e => e.AssessmentType)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("ASSESSMENT TYPE");

                entity.Property(e => e.Comments)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("COMMENTS");

                entity.Property(e => e.DateCapDue)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE CAP DUE");

                entity.Property(e => e.DateIssued)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE ISSUED");

                entity.Property(e => e.NcrNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("NCR NUMBER");

                entity.Property(e => e.NonconformanceSummary)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("NONCONFORMANCE SUMMARY");

                entity.Property(e => e.NonconformanceType)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("NONCONFORMANCE TYPE");

                entity.Property(e => e.Observation1)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("OBSERVATION 1");

                entity.Property(e => e.Observation2)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("OBSERVATION 2");

                entity.Property(e => e.Observation3)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("OBSERVATION 3");

                entity.Property(e => e.Observation4)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("OBSERVATION 4");

                entity.Property(e => e.PdrNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PDR NUMBER");

                entity.Property(e => e.QcInspector)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("QC INSPECTOR");

                entity.Property(e => e.QcfrNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("QCFR NUMBER");

                entity.Property(e => e.Requirement1)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("REQUIREMENT 1");

                entity.Property(e => e.Requirement2)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("REQUIREMENT 2");

                entity.Property(e => e.Requirement3)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("REQUIREMENT 3");

                entity.Property(e => e.Requirement4)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("REQUIREMENT 4");

                entity.Property(e => e.ResponsibleDiscipline)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("RESPONSIBLE DISCIPLINE");

                entity.Property(e => e.ResponsiblePersone)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("RESPONSIBLE PERSONE");

                entity.Property(e => e.ResponsibleSub)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("RESPONSIBLE SUB");

                entity.Property(e => e.Site)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SITE");

                entity.Property(e => e.SpecItem)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SPEC ITEM");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("STATUS");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("TITLE");

                entity.Property(e => e.WoNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("WO NUMBER");
            });

            modelBuilder.Entity<TbPawtracker>(entity =>
            {
                entity.ToTable("tb_PAWTracker");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Annex)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Comments)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("COMMENTS");

                entity.Property(e => e.DateAcknowledged)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE ACKNOWLEDGED");

                entity.Property(e => e.DateClosedByPar)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE CLOSED BY PAR");

                entity.Property(e => e.DateReceived)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE RECEIVED");

                entity.Property(e => e.DateSentToPar)
                    .HasColumnType("datetime")
                    .HasColumnName("DATE SENT TO PAR");

                entity.Property(e => e.Description)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("DESCRIPTION");

                entity.Property(e => e.DescriptionShort)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("DESCRIPTION SHORT");

                entity.Property(e => e.Location)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ModNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("MOD NUMBER");

                entity.Property(e => e.Par)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PAR");

                entity.Property(e => e.PastDueFromPar)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PAST DUE FROM PAR");

                entity.Property(e => e.PawAssessment)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PAW ASSESSMENT");

                entity.Property(e => e.PawLevel)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PAW LEVEL");

                entity.Property(e => e.PawNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PAW Number");

                entity.Property(e => e.PawRating)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PAW RATING");

                entity.Property(e => e.PawResponse)
                    .HasMaxLength(800)
                    .IsUnicode(false)
                    .HasColumnName("PAW RESPONSE");

                entity.Property(e => e.PawStatus)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("PAW STATUS");

                entity.Property(e => e.ResponseBy)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("RESPONSE BY");

                entity.Property(e => e.Site)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SITE");

                entity.Property(e => e.SpecItem1)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SPEC ITEM 1");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ToNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("TO NUMBER");

                entity.Property(e => e.UnsatCondition)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("UNSAT Condition");

                entity.Property(e => e.UnsatRootCause)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("UNSAT ROOT CAUSE");

                entity.Property(e => e.Validity)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("VALIDITY");

                entity.Property(e => e.WoNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("WO Number");
            });

            modelBuilder.Entity<TbUser>(entity =>
            {
                entity.ToTable("tb_Users");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.AccessType)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("access_type");

                entity.Property(e => e.ActivateAutologout).HasColumnName("activate_autologout");

                entity.Property(e => e.ActiveStatus).HasColumnName("active_status");

                entity.Property(e => e.Aor)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("aor");

                entity.Property(e => e.AssosicateInspectors).HasColumnName("assosicate_inspectors");

                entity.Property(e => e.CustomerInspectors).HasColumnName("customer_inspectors");

                entity.Property(e => e.DeleteRights).HasColumnName("delete_rights");

                entity.Property(e => e.EditRights).HasColumnName("edit_rights");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("first_name");

                entity.Property(e => e.FullAdminRights).HasColumnName("full_admin_rights");

                entity.Property(e => e.FullName)
                    .HasMaxLength(243)
                    .IsUnicode(false)
                    .HasColumnName("full_name");

                entity.Property(e => e.ImportRights).HasColumnName("import_rights");

                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("last_name");

                entity.Property(e => e.LoginId)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("login_id");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.PlanEstimateInspectors).HasColumnName("plan_estimate_inspectors");

                entity.Property(e => e.PositionTitle)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("position_title");

                entity.Property(e => e.QualityInspectors).HasColumnName("quality_inspectors");

                entity.Property(e => e.ResetPassword).HasColumnName("reset_password");

                entity.Property(e => e.SecurityAnsOne)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("security_ans_one");

                entity.Property(e => e.SecurityQuesOne)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("security_ques_one");

                entity.Property(e => e.ViewRights).HasColumnName("view_rights");
            });

            modelBuilder.Entity<TbUserLevelAccess>(entity =>
            {
                entity.ToTable("tb_UserLevelAccess");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.AccessLevel)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TbUserLogin>(entity =>
            {
                entity.ToTable("tb_UserLogin");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.AccessLevel)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CanBackupDb).HasColumnName("CanBackupDB");

                entity.Property(e => e.CanChangeDblocation).HasColumnName("CanChangeDBLocation");

                entity.Property(e => e.Dbaccess).HasColumnName("DBAccess");

                entity.Property(e => e.DbmasterUnlock).HasColumnName("DBMasterUnlock");

                entity.Property(e => e.DbupdateNotification).HasColumnName("DBUpdateNotification");

                entity.Property(e => e.LoginId)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("LoginID");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ResetPw).HasColumnName("ResetPW");

                entity.Property(e => e.SecurityQ1)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SecurityQ1a)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SecurityQ1A");

                entity.Property(e => e.SecurityQ2)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SecurityQ2a)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SecurityQ2A");

                entity.Property(e => e.SecurityQ3)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SecurityQ3a)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("SecurityQ3A");

                entity.Property(e => e.User3X5)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UserFn)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("UserFN");

                entity.Property(e => e.UserLn)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("UserLN");

                entity.Property(e => e.WorkSite)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblBuilding>(entity =>
            {
                entity.ToTable("tblBuildings");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.BuildingNumber)
                    .HasMaxLength(800)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblMiscOption>(entity =>
            {
                entity.ToTable("tblMiscOptions");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.DblocationLink)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("DBLocationLink");

                entity.Property(e => e.HideIdiqHistory)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("HIDE IDIQ History");

                entity.Property(e => e.PdrtoApproveCounterMyp).HasColumnName("PDRtoApproveCounterMYP");

                entity.Property(e => e.PdrtoApproveCounterNas).HasColumnName("PDRtoApproveCounterNAS");
            });

            modelBuilder.Entity<TblPdrtemplate>(entity =>
            {
                entity.ToTable("tblPDRTemplates");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.Annex)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CauseCode)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Fmname)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("FMName");

                entity.Property(e => e.Fmtitle)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("FMTitle");

                entity.Property(e => e.Requirements)
                    .HasMaxLength(800)
                    .IsUnicode(false);

                entity.Property(e => e.RootCause)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SpecItem)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SurveillanceResults)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SurveillanceType)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TemplateName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblSecureLogin>(entity =>
            {
                entity.ToTable("tblSecureLogin");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.OtherOptions)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblVersionServer>(entity =>
            {
                entity.ToTable("tblVersionServer");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");

                entity.Property(e => e.VersionNumber)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        #region TableEntity
        public virtual DbSet<ATbElinNumber> ATbElinNumbers { get; set; } = null!;
        public virtual DbSet<ATbImage> ATbImages { get; set; } = null!;
        public virtual DbSet<ATbNasbmdannexTable> ATbNasbmdannexTables { get; set; } = null!;
        public virtual DbSet<ATbNasinspection> ATbNasinspections { get; set; } = null!;
        public virtual DbSet<ATbNasinspectionsArchive> ATbNasinspectionsArchives { get; set; } = null!;
        public virtual DbSet<ATbNasinspectionsImport> ATbNasinspectionsImports { get; set; } = null!;
        public virtual DbSet<ATbPdrtracker> ATbPdrtrackers { get; set; } = null!;
        public virtual DbSet<ATbYear> ATbYears { get; set; } = null!;
        public virtual DbSet<TbCcrtracker> TbCcrtrackers { get; set; } = null!;
        public virtual DbSet<TbCdrtracker> TbCdrtrackers { get; set; } = null!;
        public virtual DbSet<TbDbrevision> TbDbrevisions { get; set; } = null!;
        public virtual DbSet<TbDbsetting> TbDbsettings { get; set; } = null!;
        public virtual DbSet<TbDirectoryName> TbDirectoryNames { get; set; } = null!;
        public virtual DbSet<TbDropDownMenu> TbDropDownMenus { get; set; } = null!;
        public virtual DbSet<TbIdiqtracker> TbIdiqtrackers { get; set; } = null!;
        public virtual DbSet<TbLogInTime> TbLogInTimes { get; set; } = null!;
        public virtual DbSet<TbLoginSecurityQ> TbLoginSecurityQs { get; set; } = null!;
        public virtual DbSet<TbMenuCustomerCcrstatus> TbMenuCustomerCcrstatuses { get; set; } = null!;
        public virtual DbSet<TbMenuCustomerFmbldgManager> TbMenuCustomerFmbldgManagers { get; set; } = null!;
        public virtual DbSet<TbMenuCustomerPawassessment> TbMenuCustomerPawassessments { get; set; } = null!;
        public virtual DbSet<TbMenuCustomerPawlevel> TbMenuCustomerPawlevels { get; set; } = null!;
        public virtual DbSet<TbMenuCustomerPawstatus> TbMenuCustomerPawstatuses { get; set; } = null!;
        public virtual DbSet<TbMenuIdiqWotype> TbMenuIdiqWotypes { get; set; } = null!;
        public virtual DbSet<TbMenuInspectionCauseCode> TbMenuInspectionCauseCodes { get; set; } = null!;
        public virtual DbSet<TbMenuInspectionCauseCorrectiveAction> TbMenuInspectionCauseCorrectiveActions { get; set; } = null!;
        public virtual DbSet<TbMenuInspectionCauseRoot> TbMenuInspectionCauseRoots { get; set; } = null!;
        public virtual DbSet<TbMenuInspectionPdrstatus> TbMenuInspectionPdrstatuses { get; set; } = null!;
        public virtual DbSet<TbMenuInspectionStatus> TbMenuInspectionStatuses { get; set; } = null!;
        public virtual DbSet<TbMenuInspectionSurvResult> TbMenuInspectionSurvResults { get; set; } = null!;
        public virtual DbSet<TbMenuInspectionType> TbMenuInspectionTypes { get; set; } = null!;
        public virtual DbSet<TbMenuNamingConvention> TbMenuNamingConventions { get; set; } = null!;
        public virtual DbSet<TbMenuValidStatus> TbMenuValidStatuses { get; set; } = null!;
        public virtual DbSet<TbMonthDate> TbMonthDates { get; set; } = null!;
        public virtual DbSet<TbNcrtracker> TbNcrtrackers { get; set; } = null!;
        public virtual DbSet<TbPawtracker> TbPawtrackers { get; set; } = null!;
        public virtual DbSet<TbUser> TbUsers { get; set; } = null!;
        public virtual DbSet<TbUserLevelAccess> TbUserLevelAccesses { get; set; } = null!;
        public virtual DbSet<TbUserLogin> TbUserLogins { get; set; } = null!;
        public virtual DbSet<TblBuilding> TblBuildings { get; set; } = null!;
        public virtual DbSet<TblMiscOption> TblMiscOptions { get; set; } = null!;
        public virtual DbSet<TblPdrtemplate> TblPdrtemplates { get; set; } = null!;
        public virtual DbSet<TblVersionServer> TblVersionServers { get; set; } = null!;

        #endregion TableEntity

        #region ViewEntity
        public DbSet<TbDirectoryNamesView> TbDirectoryNamesView { get; set; }
        #endregion ViewEntity

        #region SPEntity
        #endregion SPEntity

        #region  RawSQL Entity
        public DbSet<TotalRecordCountGLB> TotalRecordCountGLB { get; set; }
        #endregion RawSQL Entity

    }

}
