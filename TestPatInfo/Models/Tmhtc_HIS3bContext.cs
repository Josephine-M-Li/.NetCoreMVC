﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TestPatInfo.Models
{
    public partial class Tmhtc_HIS3bContext : DbContext
    {
        public Tmhtc_HIS3bContext()
        {
        }

        public Tmhtc_HIS3bContext(DbContextOptions<Tmhtc_HIS3bContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TestPatinfo> TestPatinfo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TestPatinfo>(entity =>
            {
                entity.HasKey(e => e.PatKey);

                entity.ToTable("test_patinfo");

                entity.Property(e => e.PatId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("PatID");

                entity.Property(e => e.PatIdno)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("PatIDNo");

                entity.Property(e => e.PatName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PatTel)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}